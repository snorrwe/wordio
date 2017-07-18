import { Injectable } from "@angular/core";
import { EveHttpService, CollectionDto } from "./http.service";
import { Urls } from "./http/urls";

import { Tile } from "../models/tile";
import { GameDto, Game } from "../models/game";

@Injectable()
export class GameService {

    constructor(private httpService: EveHttpService) { }

    getGame(id: string, ...queries: { key: string, value: any }[]): Promise<Game> {
        if (!queries) queries = [];
        if (queries.findIndex((param) => param.key === "embedded") === -1) {
            queries.push({ key: "embedded", value: JSON.stringify({ board: 1 }) });
        }
        return this.httpService.get<GameDto>(this.url(Urls.GAMES) + id, ...queries)
            .then(game => {
                return new Game(game);
            });
    }

    listGames(...queries: { key: string, value: any }[]): Promise<Game[]> {
        if (!queries || !queries.length) {
            queries = [
                { key: "projection", value: JSON.stringify({ host: 1, name: 1 }) }
                , { key: "embedded", value: JSON.stringify({ host: 1 }) }
            ];
        }
        return this.httpService.get<CollectionDto<GameDto>>(this.url(Urls.GAMES), ...queries)
            .then(response => {
                const result = [];
                for (let game of response._items || []) {
                    game.board = [];
                    result.push(new Game(game));
                }
                return result;
            });
    }

    addGame(game: Game): Promise<Game> {
        const dto = Game.makeDto(game);
        return this.httpService.post<GameDto>(this.url(Urls.GAMES), dto).then(result => new Game(result));
    }

    private url(url: string) {
        const result = Urls.API_BASE_URL + url;
        return result;
    }
}
