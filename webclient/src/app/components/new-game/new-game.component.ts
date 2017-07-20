import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'wordio-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

    constructor(private gameService: GameService) { }
}
