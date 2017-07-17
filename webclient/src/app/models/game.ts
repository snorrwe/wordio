import { MongoItem } from './mongo.template';
import { Tile } from './tile';

export class Game extends MongoItem {
    host: { displayName: string };
    board: Tile[][];

    constructor(game?: Game | GameDto) {
        super();
        if (!game) return;
        this.host = game.host;
        this._id = game._id;
        this._etag = game._etag;
        this._updated = game._updated;
        this._created = game._created;
        if (game instanceof Game) {
            this.board = game.board;
        } else {
            this.board = Game.createMatrix(game.board);
        }
    }

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
}

export interface GameDto extends MongoItem {
    host: { displayName: string };
    board: Tile[];
}
