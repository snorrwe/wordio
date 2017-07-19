import { Routes } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";
import { GameComponent } from "./components/game/game.component";

export const routes: Routes = [
    { path: "", redirectTo: "games", pathMatch: "full" }
    , { path: "games", component: IndexComponent }
    , { path: "games/:id", component: GameComponent }
];
