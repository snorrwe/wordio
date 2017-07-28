import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Tile } from "../../models/tile";

@Component({
    selector: "wordio-board",
    templateUrl: "./board.component.html",
    styleUrls: ["./board.component.css"]
})
export class BoardComponent {

    @Input("board") private board: Tile[][];
    @Output("onChange") private onChangeEmitter = new EventEmitter<Tile[][]>();
    @Output("onTileSelect") private onTileSelectEmitter = new EventEmitter<{ tile: Tile, mouseEvent: MouseEvent }>();

    onTileSelect(tile, event) {
        this.onTileSelectEmitter.emit({ tile: tile, mouseEvent: event.mouseEvent });
    }
}
