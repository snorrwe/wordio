import { Component, OnInit } from "@angular/core";
import { GameService } from "../../services/game.service";
import { Tile } from "../../models/tile";
import { hashBoard, parseBoard } from "../../models/board";

const alphabetLength = "Z".charCodeAt(0) - "A".charCodeAt(0) + 1;
const charCodeA = "A".charCodeAt(0);

@Component({
    selector: "wordio-new-game",
    templateUrl: "./new-game.component.html",
    styleUrls: ["./new-game.component.scss"]
})
export class NewGameComponent implements OnInit {
    boardHash: string;

    private isLoading: boolean;
    private _board: Tile[][] = [];
    get board() { return this._board; }
    set board(value) {
        this._board = value;
        this.boardHash = hashBoard(this.board);
    }

    private _columns = 15;
    get columns() { return this._columns; }
    set columns(value) {
        this._columns = +value;
        this.buildBoard();
    }

    private _rows = 15;
    get rows() { return this._rows; }
    set rows(value) {
        this._rows = +value;
        this.buildBoard();
    }

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.buildBoard();
    }

    submit() {
        throw new Error("Not implemented");
    }

    buildBoard() {
        this.isLoading = true;
        let stageBoard = [];
        let result = Promise.resolve();
        for (let i = 0; i < this.rows; ++i) {
            result = result
                .then(() => {
                    return this.buildRow(i, stageBoard);
                });
        }
        return result
            .then(() => {
                return this.onBuildFinish(stageBoard);
            })
            .catch(error => {
                console.error("Error while building the board", error);
                return this.onBuildFinish(stageBoard);
            });
    }

    private buildRow(row: number, stageBoard: Tile[][]) {
        const line = (this.board[row] && this.board[row].filter((v, index) => index < this.columns))
            || [];
        for (let column = line.length; column < this.columns; ++column) {
            const value = this.getCharByPosition(row, column);
            line.push({
                x: column,
                y: row,
                filled: false,
                value: value
            });
        }
        stageBoard.push(line);
    }

    private onBuildFinish(stageBoard) {
        this.isLoading = false;
        this.board = stageBoard;
    }

    private getCharByPosition(x: number, y: number) {
        return String.fromCharCode((x * this.rows + y) % alphabetLength + charCodeA);
    }

    onTileSelect(event: { tile: Tile, mouseEvent: MouseEvent }) {
        console.log(event, this.board[event.tile.y][event.tile.x]);
    }

    onHashChange() {
        const result = parseBoard(this.boardHash);
        this.board = result.board;
        if (this.rows !== result.rows || this.columns !== result.columns) {
            this.columns = result.columns;
            this.rows = result.rows;
            this.buildBoard();
        }
    }
}
