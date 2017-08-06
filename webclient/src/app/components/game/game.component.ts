import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NavigationService } from "../../services/navigation.service";
import { GameService } from "../../services/game.service";
import { Game } from "../../models/game";

@Component({
    selector: "wordio-game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {

    private _isLoading: boolean;
    get isLoading() { return this._isLoading; }
    game: Game;

    constructor(
        private gameService: GameService
        , private activatedRoute: ActivatedRoute
        , private navigationService: NavigationService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params["id"];
            this._isLoading = true;
            this.gameService.getGame(id)
                .then(game => {
                    this.game = game;
                    this._isLoading = false;
                })
                .catch(error => {
                    console.error("Error while fetching game", id);
                    this.navigationService.push("/games");
                });
        });
    }
}
