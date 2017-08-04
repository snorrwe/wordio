import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate/ng2-translate";

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
import { HeaderComponent } from "./components/header/header.component";
import { NewGameComponent } from "./components/new-game/new-game.component";
import { LoginComponent } from "./components/login/login.component";

export function translateFactory(http: Http) {
    return new TranslateStaticLoader(http, "../assets/languages/", ".json");
}

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
        HeaderComponent,
        NewGameComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: translateFactory,
            deps: [Http]
        }),
        BrowserAnimationsModule
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
