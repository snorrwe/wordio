import { MongoItem } from "./mongo.template";
import { Tile } from "./tile";

export class Game extends MongoItem {
    private _host: { displayName: string };
    get host() { return this._host; }

    private _board?: Tile[][];
    get board() { return this._board; }

    private _name: string;
    get name() { return this._name; }

    private _availableFrom: Date;
    get availableFrom() { return this._availableFrom; }
    private _availableUntil: Date;
    get availableUntil() { return this._availableUntil; }

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
        for (const column of game.board || []) {
            board.push(...column);
        }
        const result = {
            _created: game._created
            , _etag: game._etag
            , _id: game._id
            , _updated: game._updated
            , host: game._host
            , board: board
            , name: game.name
            , availableFrom: game.availableFrom
            , availableUntil: game.availableUntil
        };
        Game.removeFalsyFields(result);
        return result;
    }

    static removeFalsyFields(obj: Object) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (!obj[key]) delete obj[key];
        }
    }

    constructor(game?: Game | GameDto) {
        super();
        if (!game) return;
        this._host = game.host;
        this._id = game._id;
        this._etag = game._etag;
        this._updated = game._updated;
        this._created = game._created;
        this._name = game.name;
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
    name: string;
    availableFrom?: Date;
    availableUntil?: Date;
}
