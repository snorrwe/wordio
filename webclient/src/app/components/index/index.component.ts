import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { GameService } from "../../services/game.service";
import { NavigationService } from "../../services/navigation.service";
import { Game } from "../../models/game";

@Component({
    selector: "wordio-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

    private games: Game[];
    private isLoading: boolean;

    constructor(
        private gameService: GameService
        , private changeDetector: ChangeDetectorRef
        , private navigationService: NavigationService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.changeDetector.detectChanges();
        this.gameService.listGames(1)
            .then(result => {
                this.games = result;
                this.isLoading = false;
                this.changeDetector.detectChanges();
            });
    }

    newGame() {
        this.navigationService.push("newgame");
    }
}
