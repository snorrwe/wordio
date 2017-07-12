import { Tile } from './tile';

export class Board {
    id: string;
    board: Tile[][];

    constructor(board?: BoardDto | Board) {
        if (!board) {
            this.board = [];
            return;
        }
        this.id = board.id;
        if (board instanceof Board) {
            this.board = board.board.slice(0);
        } else {
            this.board = Board.makeMatrix(board.rows, board.board);
        }
    }

    static makeMatrix(rows: number, tiles: Tile[]): Tile[][] {
        tiles.sort((lhs, rhs) => lhs.position - rhs.position);
        let result: Tile[][] = [];
        for (let i = 0; i < tiles.length; i += rows) {
            let column = tiles.slice(i, i + rows);
            result.push(column);
        }
        return result;
    }
}

export interface BoardDto {
    id: string;
    board: Tile[];
    rows: number;
}
