import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Tile } from "../../models/tile";

@Component({
    selector: "wordio-board",
    templateUrl: "./board.component.html",
    styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {

    @Input("board") private board: Tile[][];
    @Output("onChange") private onChangeEmitter = new EventEmitter<Tile[][]>();

    constructor() { }

    ngOnInit() {
    }
}
