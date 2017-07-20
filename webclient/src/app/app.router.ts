import { Routes } from "@angular/router";

import { AuthenticationService } from "./services/authentication.service";

import { IndexComponent } from "./components/index/index.component";
import { GameComponent } from "./components/game/game.component";
import { NewGameComponent } from "./components/new-game/new-game.component";

export const routes: Routes = [
    { path: "", redirectTo: "games", pathMatch: "full" }
    , { path: "games", component: IndexComponent }
    , { path: "games/:id", component: GameComponent }
    , { path: "newgame", component: NewGameComponent, canActivate: [AuthenticationService] }
];
