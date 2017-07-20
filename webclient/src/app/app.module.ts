import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./components/board/board.component";
import { IndexComponent } from "./components/index/index.component";

import { ReversePipe } from "./pipes/reverse.pipe";

import { AuthenticationService } from "./services/authentication.service";
import { GameService } from "./services/game.service";
import { EveHttpService } from "./services/http.service";
import { NavigationService } from "./services/navigation.service";

import { routes } from "./app.router";
import { GameListItemComponent } from "./components/game-list-item/game-list-item.component";
import { GameComponent } from "./components/game/game.component";
import { LoadedDirective } from "./directives/loaded.directive";
import { TileComponent } from "./components/tile/tile.component";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        ReversePipe,
        IndexComponent,
        GameListItemComponent,
        GameComponent,
        LoadedDirective,
        TileComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        AuthenticationService
        , GameService
        , EveHttpService
        , NavigationService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
