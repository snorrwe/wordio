import { Component, OnInit } from "@angular/core";
import { GameService } from "../../services/game.service";
import { Tile } from "../../models/tile";

function hashBoard(board: Tile[][]): string {
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

function parseBoard(board: string): { board: Tile[][], columns: number, rows: number } {
    const lines = board.split("\n");
    const matrix = [];
    for (const line of lines) {
        const items = line.split(/[ ,;]+/).filter(value => value != null && value.length === 1);
        if (items.length) matrix.push(items);
    }
    const result = [];
    let columns = 0;
    let rows = 0;
    for (let i = 0; i < matrix.length; i++) {
        if (i > rows) rows = i;
        const line: Tile[] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            if (!matrix[i][j]) continue;
            if (j > columns) columns = j;
            line.push({
                x: i,
                y: j,
                value: matrix[i][j]
            });
        }
        result.push(line);
    }
    return {
        board: result,
        columns: columns + 1,
        rows: rows + 1
    };
}

@Component({
    selector: "wordio-new-game",
    templateUrl: "./new-game.component.html",
    styleUrls: ["./new-game.component.scss"]
})
export class NewGameComponent implements OnInit {
    private _board: Tile[][] = [];
    get board() { return this._board; }
    set board(value) {
        this._board = value;
        this.handleBoardChange();
    }

    private _columns = 2;
    get columns() { return this._columns; }
    set columns(value) {
        this._columns = +value;
        this.handleParamsChange();
    }

    private _rows = 2;
    get rows() { return this._rows; }
    set rows(value) {
        this._rows = +value;
        this.handleParamsChange();
    }

    private _boardHash: string;
    get boardHash() { return this._boardHash; }
    set boardHash(value) { this._boardHash = value; }

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.handleParamsChange();
    }

    submit() {
        throw new Error("Not implemented");
    }

    private handleParamsChange() {
        const board = [];
        for (let i = 0; i < this.rows; ++i) {
            const line = (this.board[i] && this.board[i]
                        .filter((v, index) => index < this.columns))
                        || [];
            for (let j = line.length; j < this.columns; ++j) {
                const value = this.getCharByPosition(i, j);
                line.push({
                    x: j,
                    y: i,
                    filled: false,
                    value: value
                });
            }
            board.push(line);
        }
        this.board = board;
    }

    private getCharByPosition(x: number, y: number) {
        const alphabetLength = ("Z".charCodeAt(0) - "A".charCodeAt(0));
        return String.fromCharCode((x * this.rows + y) % alphabetLength + "A".charCodeAt(0));
    }

    onTileSelect(event: { tile: Tile, mouseEvent: MouseEvent }) {
        console.log(event, this.board[event.tile.y][event.tile.x]);
    }

    private handleBoardChange() {
        this.boardHash = hashBoard(this.board);
    }

    onHashChange() {
        const result = parseBoard(this.boardHash);
        this.columns = result.columns;
        this.rows = result.rows;
        this.board = result.board;
        this.handleParamsChange();
    }
}
