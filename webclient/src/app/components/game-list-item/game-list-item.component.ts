import { Component, Input } from "@angular/core";
import { Game } from "../../models/game";

import { NavigationService } from "../../services/navigation.service";

@Component({
    selector: "wordio-game-list-item",
    templateUrl: "./game-list-item.component.html",
    styleUrls: ["./game-list-item.component.css"]
})
export class GameListItemComponent {
    @Input("game") private game: Game;

    constructor(private navigationService: NavigationService) { }

    onClick() {
        if (this.game && this.game._id) {
            this.navigationService.push("games/" + this.game._id);
        }
    }
}
