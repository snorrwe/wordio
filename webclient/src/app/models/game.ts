import { MongoItem } from "./mongo.template";
import { Tile } from "./tile";

export namespace Board {

    export const Separators = /[ ,;]+/;

    export function hashBoard(board: Tile[][]): string {
        let result = "";
        board.forEach(column => {
            if (!column || !column.length) return;
            column.forEach(tile => {
                result += tile.value + " ";
            });
            result += "\n";
        });
        return result;
    }

    export function buildColumnByValues(values: string[], x: number = 0) {
        const line = [];
        let columns = 0
        values.forEach((value, i) => {
            if (!value) return;
            if (i > columns) columns = i;
            line.push({
                x: x,
                y: i,
                value: value
            });
        });
        return { line: line, columns: columns };
    }

    function buildBoardByValues(matrix: string[][]) {
        const result = [];
        let columns = 0;
        let rows = 0;
        matrix.forEach((row, i) => {
            if (i > rows) rows = i;
            const line = buildColumnByValues(row, i);
            if (columns < line.columns) columns = line.columns;
            result.push(line.line);
        });
        return {
            board: result,
            columns: columns + 1,
            rows: rows + 1
        };
    }

    export function parseBoard(board: string): { board: Tile[][], columns: number, rows: number } {
        const lines = board.split("\n");
        const matrix = [];
        for (const line of lines) {
            const items = line.split(Separators).filter(value => value != null && value.length === 1);
            if (items.length) matrix.push(items);
        }
        return buildBoardByValues(matrix);
    }
}

export class Game extends MongoItem {
    private _host: { displayName: string };
    get host() { return this._host; }

    private _board?: Tile[][];
    get board() { return this._board; }

    private _name: string;
    get name() { return this._name; }

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
            , name: game._name
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
}
