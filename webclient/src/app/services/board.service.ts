import { Injectable } from "@angular/core";
import { EveHttpService, ItemsDto } from "./http.service";
import { Urls } from './http/urls';

import { Tile } from "../models/tile";
import { GameDto, Game } from "../models/game";

@Injectable()
export class BoardService {

    constructor(private httpService: EveHttpService) { }

    getGames(): Promise<Game[]> {
        return this.httpService.get<ItemsDto<GameDto>>(this.url(Urls.GAMES))
            .then(response => {
                let result: Game[] = [];
                for (let game of response._items) {
                    result.push(new Game(game));
                }
                return result;
            });
    }

    private url(url: string) {
        let result = Urls.API_BASE_URL + url;
        while (result.indexOf("//") > -1) result.replace("//", "/");
        result += "/";
        return result;
    }
}
