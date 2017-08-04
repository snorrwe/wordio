import { Component, Input } from "@angular/core";
import { Game } from "../../models/game";

import { NavigationService } from "../../services/navigation.service";

@Component({
    selector: "wordio-game-list-item",
    templateUrl: "./game-list-item.component.html",
    styleUrls: ["./game-list-item.component.css"]
})
export class GameListItemComponent {
    @Input("game") private _game: Game;
    get game() { return this._game; }

    constructor(private navigationService: NavigationService) { }

    onClick() {
        if (this._game && this._game._id) {
            this.navigationService.push("games/" + this._game._id);
        }
    }
}
