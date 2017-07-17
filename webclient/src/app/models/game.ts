import { MongoItem } from "./mongo.template";
import { Tile } from "./tile";

export class Game extends MongoItem {
    private _host: { displayName: string };
    get host() { return this._host; }

    private _board?: Tile[][];
    get board() { return this._board; }

    private static createMatrix(board: Tile[]): Tile[][] {
        if (!board || !board.length) return [];
        const result: Tile[][] = [];
        board.sort((a, b) => a.x - b.x || a.y - b.y);
        let row: Tile[] = [board[0]];
        for (let i = 1; i < board.length; ++i) {
            if (board[i].x === row[row.length - 1].x) {
                row.push(board[i]);
            } else {
                result.push(row);
                row = [board[i]];
            }
        }
        result.push(row);
        return result;
    }

    static makeDto(game: Game): GameDto {
        if (!game) return null;
        const board = [];
        for (const column of game._board || []) {
            board.push(...column);
        }
        return {
            _created: game._created
            , _etag: game._etag
            , _id: game._id
            , _updated: game._updated
            , host: game._host
            , board: board
        };
    }

    constructor(game?: Game | GameDto) {
        super();
        if (!game) return;
        this._host = game.host;
        this._id = game._id;
        this._etag = game._etag;
        this._updated = game._updated;
        this._created = game._created;
        if (game instanceof Game) {
            this._board = game._board || [];
        } else {
            this._board = Game.createMatrix(game.board || []);
        }
    }
}

export interface GameDto extends MongoItem {
    host: { displayName: string };
    board: Tile[];
}
