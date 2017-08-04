import { Tile } from "./tile";

export const Separators = /[ ,;]+/;

export namespace Board {
    export function buildColumnByValues(values: string[], x: number = 0) {
        const line = [];
        let columns = 0;
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

    export function parseBoard(board: string): { board: Tile[][], columns: number, rows: number } {
        const lines = board.split("\n");
        const matrix = [];
        for (const line of lines) {
            const items = line.split(Separators).filter(value => value != null && value.length === 1);
            if (items.length) matrix.push(items);
        }
        return buildBoardByValues(matrix);
    }


    export function buildBoard(onBuildFinish: (tile: Tile[][]) => void) {
        const stageBoard = [];
        let result = Promise.resolve();
        for (let i = 0; i < this.rows; ++i) {
            result = result
                .then(() => {
                    return buildRow(i, stageBoard);
                });
        }
        return result
            .then(() => {
                return onBuildFinish(stageBoard);
            })
            .catch(error => {
                console.error("Error while building the board", error);
                return onBuildFinish(stageBoard);
            });
    }

    function buildRow(row: number, stageBoard: Tile[][]) {
        const line = (this.board[row] && this.board[row].filter((v, index) => index < this.columns))
            || [];
        for (let column = line.length; column < this.columns; ++column) {
            const value = getCharByPosition(row, column);
            line.push({
                x: column,
                y: row,
                filled: false,
                value: value
            });
        }
        stageBoard.push(line);
    }

    const alphabetLength = charCode("Z") - charCode("A") + 1;

    function charCode(char: string) {
        return char.charCodeAt(0);
    }

    function getCharByPosition(x: number, y: number) {
        return String.fromCharCode((x * this.rows + y) % alphabetLength + charCode("A"));
    }
}

export const hashBoard = Board.hashBoard;
export const parseBoard = Board.parseBoard;
export const buildBoard = Board.buildBoard;
