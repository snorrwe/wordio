import { Injectable } from "@angular/core";
import { EveHttpService, CollectionDto } from "./http.service";
import { Urls } from "./http/urls";
import { Tile } from "../models/tile";
import { GameDto, Game } from "../models/game";

@Injectable()
export class GameService {

    constructor(private httpService: EveHttpService) { }

    getGame(id: string): Promise<Game> {
        return this.httpService.get<GameDto>(this.url(Urls.GAMES) + id, { key: "embedded", value: JSON.stringify({ board: 1 }) })
            .then(game => {
                return new Game(game);
            });
    }

    listGames(page: number = 1): Promise<Game[]> {
        const queries = [
            { key: "projection", value: { host: 1, name: 1 } }
            , { key: "embedded", value: { host: 1 } }
            , { key: "page", value: (page > 0 ? page : 1).toString() }
        ];
        return this.httpService.get<CollectionDto<GameDto>>(this.url(Urls.GAMES), ...queries)
            .then(response => {
                const result = [];
                for (const game of response && response._items || []) {
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
