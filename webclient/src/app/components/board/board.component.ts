import { Component, Input, Output, EventEmitter } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Tile } from "../../models/tile";

@Component({
    selector: "wordio-board",
    templateUrl: "./board.component.html",
    styleUrls: ["./board.component.css"],
    animations: [
        trigger("appearance", [
            state('in', style({transform: '*'})),
            transition('void => *', [
                style({transform: 'scale(1.1)'}),
                animate('0.2s ease-in')
            ]),
            transition('* => void', [
                style({transform: 'scale(0)'}),
                animate('0.2s ease-out')
            ])
        ])
    ]
})
export class BoardComponent {

    @Input("board") private board: Tile[][];
    @Output("onChange") private onChangeEmitter = new EventEmitter<Tile[][]>();
    @Output("onTileSelect") private onTileSelectEmitter = new EventEmitter<{ tile: Tile, mouseEvent: MouseEvent }>();

    onTileSelect(tile, event) {
        this.onTileSelectEmitter.emit({ tile: tile, mouseEvent: event.mouseEvent });
    }

    getFontSize(){
        if(!this.board
           || this.board.length < 10 
           || this.board[0].length < 10
        ){
            return null;
        }
        const length = Math.max(this.board.length, this.board[0].length);
        const result = Math.floor(50 / length) + 2;
        return result;
    }

    getBoxSize(){
        let result = this.getFontSize();
        if(!result) return;
        return result + 3 + "vmin";
    }
}
