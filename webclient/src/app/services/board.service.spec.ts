import { TestBed, inject, async } from "@angular/core/testing";

import { BoardService } from "./board.service";
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
                BoardService
                , { provide: EveHttpService, useValue: httpService }
            ]
        });
    });

    it("should be created", inject([BoardService], (service: BoardService) => {
        expect(service).toBeTruthy();
    }));

    describe("getGames tests", () => {
        let get: Function;

        beforeEach(() => {
            httpService.get = ((...args) => get(args)) as any;
        });

        it("positive test, ordered", async(inject([BoardService], (service: BoardService) => {
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

        it("positive test, reversed", async(inject([BoardService], (service: BoardService) => {
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

        it("positive test, unordered", async(inject([BoardService], (service: BoardService) => {
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

        it("positive test, empty boards", async(inject([BoardService], (service: BoardService) => {
            get = () => Promise.resolve({
                _items: [
                    {
                        board: [
                        ]
                    }
                    , {
                        board: [
                        ]
                    }
                    , {
                        board: [
                        ]
                    }
                ]
            });

            return service.listGames()
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(3);
                    for (let game of result) {
                        expect(game).toBeTruthy();
                        assertBoardIsValid(game.board, 0, 0);
                    }
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("positive test, 2×2, ordered boards", async(inject([BoardService], (service: BoardService) => {
            get = () => Promise.resolve({
                _items: [
                    {
                        board: [
                            {x: 0, y: 0}
                            , {x: 0, y: 1}
                            , {x: 1, y: 0}
                            , {x: 1, y: 1}
                        ]
                    }
                    , {
                        board: [
                            {x: 0, y: 0}
                            , {x: 0, y: 1}
                            , {x: 1, y: 0}
                            , {x: 1, y: 1}
                        ]
                    }
                    , {
                        board: [
                            {x: 0, y: 0}
                            , {x: 0, y: 1}
                            , {x: 1, y: 0}
                            , {x: 1, y: 1}
                        ]
                    }
                ]
            });

            return service.listGames()
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(3);
                    for (let game of result) {
                        expect(game).toBeTruthy();
                        assertBoardIsValid(game.board, 2, 2);
                    }
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("positive test, 3×2, unordered boards", async(inject([BoardService], (service: BoardService) => {
            get = () => Promise.resolve({
                _items: [
                    {
                        board: [
                            {x: 2, y: 1}
                            , {x: 1, y: 1}
                            , {x: 1, y: 0}
                            , {x: 0, y: 1}
                            , {x: 0, y: 0}
                            , {x: 2, y: 0}
                        ]
                    }
                    , {
                        board: [
                            {x: 2, y: 0}
                            , {x: 1, y: 1}
                            , {x: 0, y: 0}
                            , {x: 0, y: 1}
                            , {x: 2, y: 1}
                            , {x: 1, y: 0}
                        ]
                    }
                    , {
                        board: [
                            {x: 2, y: 1}
                            , {x: 2, y: 0}
                            , {x: 0, y: 1}
                            , {x: 0, y: 0}
                            , {x: 1, y: 0}
                            , {x: 1, y: 1}
                        ]
                    }
                ]
            });

            return service.listGames()
                .then(result => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(3);
                    for (let game of result) {
                        expect(game).toBeTruthy();
                        assertBoardIsValid(game.board, 3, 2);
                    }
                })
                .catch(e => {
                    fail(e);
                });
        })));
    });
});
