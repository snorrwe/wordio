import { Injectable } from "@angular/core";
import { EveHttpService, ItemsDto } from "./http.service";
import { Urls } from "./http/urls";

import { Tile } from "../models/tile";
import { GameDto, Game } from "../models/game";

@Injectable()
export class BoardService {

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

    private url(url: string) {
        const result = Urls.API_BASE_URL + url;
        return result;
    }
}
