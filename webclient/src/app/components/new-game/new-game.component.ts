import { Component, OnInit } from "@angular/core";
import { GameService } from "../../services/game.service";
import { Tile } from "../../models/tile";
import { hashBoard, parseBoard, buildBoard } from "../../models/board";

@Component({
    selector: "wordio-new-game",
    templateUrl: "./new-game.component.html",
    styleUrls: ["./new-game.component.scss"]
})
export class NewGameComponent implements OnInit {
    boardHash: string;

    private _isLoading: boolean;
    get isLoading() { return this._isLoading; }

    private _board: Tile[][] = [];
    get board() { return this._board; }
    set board(value) {
        this._board = value;
        this.boardHash = hashBoard(this.board);
    }

    private _columns: number;
    get columns() { return this._columns; }
    set columns(value) {
        if (value < 0) value = 0;
        this._columns = +value;
        this.buildBoard();
    }

    private _rows: number;
    get rows() { return this._rows; }
    set rows(value) {
        if (value < 0) value = 0;
        this._rows = +value;
        this.buildBoard();
    }

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.rows = 10;
        this.columns = 10;
        this.buildBoard();
    }

    submit() {
        throw new Error("Not implemented");
    }

    buildBoard() {
        this._isLoading = true;
        buildBoard(this.onBuildFinish);
    }

    private onBuildFinish(stageBoard) {
        this._isLoading = false;
        this.board = stageBoard;
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

    addRows(value: number) {
        this.rows += value;
    }

    addColumns(value: number) {
        this.columns += value;
    }
}
