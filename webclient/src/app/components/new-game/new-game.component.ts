import { Component } from "@angular/core";
import { GameService } from "../../services/game.service";
import { Tile } from "../../models/tile";
import { hashBoard, parseBoard } from "../../models/board";
import { IBoardParameters } from "./board-input/board-input.component";

function charCode(char: string) {
    return char.charCodeAt(0);
}

const alphabetLength = charCode("Z") - charCode("A") + 1;

function getCharByPosition(x: number, y: number) {
    return String.fromCharCode((x + y) % alphabetLength + charCode("A"));
}

@Component({
    selector: "wordio-new-game",
    templateUrl: "./new-game.component.html",
    styleUrls: ["./new-game.component.scss"]
})
export class NewGameComponent {

    rows: number;
    columns: number;
    board: Tile[][] = [];

    private _isLoading: boolean;
    get isLoading() { return this._isLoading; }

    constructor(private gameService: GameService) { }

    onTileSelect(event: { tile: Tile, mouseEvent: MouseEvent }) {
        console.log(event, this.board[event.tile.y][event.tile.x]);
    }

    buildBoard() {
        this._isLoading = true;
        const stageBoard = [];
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
            const value = getCharByPosition(row * this.rows, column);
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
        this._isLoading = false;
        this.board = stageBoard;
    }

    onBoardParameterChange(event: IBoardParameters) {
        this.columns = event.columns;
        this.rows = event.rows;
        if(event.board) this.board = event.board;
        this.buildBoard();
    }
}
