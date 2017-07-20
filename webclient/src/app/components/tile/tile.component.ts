import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "wordio-tile",
    templateUrl: "./tile.component.html",
    styleUrls: ["./tile.component.css"]
})
export class TileComponent {

    @Input("value") private value: string;
    @Input("isSelected") private isSelected: boolean;
    @Output("onSelectedChange") private onSelectedChangeEmitter = new EventEmitter<boolean>();

    constructor() { }

    onClick() {
        this.isSelected = !this.isSelected;
        this.onSelectedChangeEmitter.emit(this.isSelected);
    }
}
