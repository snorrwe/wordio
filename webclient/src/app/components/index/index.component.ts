import { Component, OnInit } from "@angular/core";
import { GameService } from "../../services/game.service";
import { Game } from "../../models/game"

@Component({
    selector: "wordio-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

    private games: Game[];

    constructor(private gameService: GameService) {
        gameService.listGames(1)
            .then(result => {
                this.games = result;
            });
    }

    ngOnInit() {
    }
}
