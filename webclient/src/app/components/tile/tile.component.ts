import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "wordio-tile",
    templateUrl: "./tile.component.html",
    styleUrls: ["./tile.component.css"]
})
export class TileComponent {

    @Input("value") value: string;
    @Input("isSelected") isSelected: boolean;
    @Input("enabled") enabled = true;
    @Input("fontSize") fontSize?: string;
    @Output("onSelectedChange") onSelectedChangeEmitter = new EventEmitter<{isSelected: boolean, mouseEvent: MouseEvent}>();

    constructor() { }

    onClick(event) {
        if (!this.enabled) return;
        this.isSelected = !this.isSelected;
        this.onSelectedChangeEmitter.emit({isSelected: this.isSelected, mouseEvent: event});
    }
}
