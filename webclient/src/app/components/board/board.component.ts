import { Component, Input, Output, EventEmitter } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Tile } from "../../models/tile";

@Component({
    selector: "wordio-board",
    templateUrl: "./board.component.html",
    styleUrls: ["./board.component.css"],
    animations: [
        trigger("appearance", [
            state("in", style({ transform: "*" })),
            transition("void => in", [
                style({ transform: "scale(1.5)" }),
                animate("0.2s ease-in")
            ]),
            transition("* => void", [
                style({ transform: "scale(0)" }),
                animate("0.2s ease-out")
            ])
        ])
    ]
})
export class BoardComponent {

    @Input("board") board: Tile[][];
    @Output("onChange") onChangeEmitter = new EventEmitter<Tile[][]>();
    @Output("onTileSelect") onTileSelectEmitter = new EventEmitter<{ tile: Tile, mouseEvent: MouseEvent }>();

    onTileSelect(tile, event) {
        this.onTileSelectEmitter.emit({ tile: tile, mouseEvent: event.mouseEvent });
    }

    getFontSize() {
        if (!this.board
            || this.board.length < 10
            || this.board[0].length < 10
        ) {
            return null;
        }
        const length = Math.max(this.board.length, this.board[0].length);
        const result = Math.floor(50 / length) + 2;
        return result;
    }

    getBoxSize() {
        const result = this.getFontSize();
        if (!result) return;
        return result + 3 + "vmin";
    }

    getTileHash(index: number, item: Tile) {
        return item.value + item.x + item.y;
    }

    getRowHash(index: number, row: Tile[]) {
        return index;
    }
}
