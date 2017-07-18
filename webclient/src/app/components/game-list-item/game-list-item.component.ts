import { Component, Input } from "@angular/core";
import { Game } from "../../models/game";

@Component({
  selector: "wordio-game-list-item",
  templateUrl: "./game-list-item.component.html",
  styleUrls: ["./game-list-item.component.css"]
})
export class GameListItemComponent {
    @Input("game") private game: Game;
}
