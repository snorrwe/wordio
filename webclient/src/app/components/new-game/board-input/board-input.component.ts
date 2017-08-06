import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Tile } from "../../../models/tile";
import { parseBoard, hashBoard } from "../../../models/board";


export interface IBoardParameters{
    columns: number;
    rows: number;
    hash?: string;
    board?: Tile[][];
}

@Component({
    selector: 'wordio-board-input',
    templateUrl: './board-input.component.html',
    styleUrls: ['./board-input.component.scss']
})
export class BoardInputComponent implements OnInit {

    @Output("onParameterChange") onParameterChangeEmitter = new EventEmitter<IBoardParameters>();

    @Input("board") set board(value){
        this.boardHash = hashBoard(value);
    }

    boardHash: string;

    private _columns: number;
    get columns() { return this._columns; }
    setColumns(value) {
        if (value < 0) value = 0;
        this._columns = +value;
        this.emitParameterChanges();
    }

    private _rows: number;
    get rows() { return this._rows; }
    setRows(value) {
        if (value < 0) value = 0;
        this._rows = +value;
        this.emitParameterChanges();
    }

    ngOnInit() { 
        this.reset(); 
    }

    reset() {
        this._rows = 10;
        this._columns = 10;
        this.emitParameterChanges();
    }

    handleHashChange() {
        const board = parseBoard(this.boardHash);
        if (this.rows !== board.rows || this.columns !== board.columns) {
            this._columns = board.columns;
            this._rows = board.rows;
        }
        this.emitParameterChanges(true, board.board);
    }

    private emitParameterChanges(emitHash: boolean = false, board?: Tile[][]){
        this.onParameterChangeEmitter.emit({
            columns: this.columns,
            rows: this.rows,
            hash: emitHash ? this.boardHash : null,
            board: board
        });
    }
}
