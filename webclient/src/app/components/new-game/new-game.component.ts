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
        this.handleParamsChange();
    }

    private _rows = 15;
    get rows() { return this._rows; }
    set rows(value) {
        this._rows = +value;
        this.handleParamsChange();
    }

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
            const line = (this.board[i] && this.board[i].filter((v, index) => index < this.columns))
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
            this.handleParamsChange();
        }
    }
}
