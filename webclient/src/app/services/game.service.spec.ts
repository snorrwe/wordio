import { TestBed, inject, async } from "@angular/core/testing";

import { GameService } from "./game.service";
import { EveHttpService } from "./http.service";

import { Tile } from "../models/tile";
import { GameDto, Game } from "../models/game";
import { assertBoardIsValid } from "../models/game.spec";

describe("BoardService", () => {
    let httpService: EveHttpService;

    beforeEach(() => {
        httpService = {} as any;
        TestBed.configureTestingModule({
            providers: [
                GameService
                , { provide: EveHttpService, useValue: httpService }
            ]
        });
    });

    it("should be created", inject([GameService], (service: GameService) => {
        expect(service).toBeTruthy();
    }));

    describe("getGames tests", () => {
        let get: Function;

        beforeEach(() => {
            httpService.get = ((...args) => get(args)) as any;
        });

        it("positive test, ordered", async(inject([GameService], (service: GameService) => {
            get = () => Promise.resolve({
                board: [
                    { x: 0, y: 0 }
                    , { x: 0, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 1, y: 1 }
                ]
            });

            return service.getGame("asd")
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.board).toBeTruthy();
                    assertBoardIsValid(result.board, 2, 2);
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("positive test, reversed", async(inject([GameService], (service: GameService) => {
            get = () => Promise.resolve({
                board: [
                    { x: 1, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 0, y: 1 }
                    , { x: 0, y: 0 }
                ]
            });

            return service.getGame("asd")
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.board).toBeTruthy();
                    assertBoardIsValid(result.board, 2, 2);
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("positive test, unordered", async(inject([GameService], (service: GameService) => {
            get = () => Promise.resolve({
                board: [
                    { x: 0, y: 1 }
                    , { x: 1, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 0, y: 0 }
                ]
            });

            return service.getGame("asd")
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.board).toBeTruthy();
                    assertBoardIsValid(result.board, 2, 2);
                })
                .catch(e => {
                    fail(e);
                });
        })));
    });

    describe("listGames tests", () => {
        let get: Function;

        beforeEach(() => {
            httpService.get = ((...args) => get(args)) as any;
        });

        it("positive test", async(inject([GameService], (service: GameService) => {
            get = () => Promise.resolve({
                _items: [{}, {}, {}]
            });

            return service.listGames()
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(3);
                    for (const game of result) {
                        expect(game).toBeTruthy();
                        expect(game.board.length).toBe(0);
                    }
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("positive test, returned _item is null", async(inject([GameService], (service: GameService) => {
            get = () => Promise.resolve({
                _items: null
            });

            return service.listGames()
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(0);
                    for (const game of result) {
                        expect(game).toBeTruthy();
                        expect(game.board.length).toBe(0);
                    }
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("positive test, result is null", async(inject([GameService], (service: GameService) => {
            get = () => Promise.resolve(null);

            return service.listGames()
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(0);
                    for (const game of result) {
                        expect(game).toBeTruthy();
                        expect(game.board.length).toBe(0);
                    }
                })
                .catch(e => {
                    fail(e);
                });
        })));
    });
});
