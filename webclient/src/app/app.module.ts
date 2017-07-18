import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./components/board/board.component";

import { ReversePipe } from "./pipes/reverse.pipe";

import { AuthenticationService } from "./services/authentication.service";
import { GameService } from "./services/game.service";
import { EveHttpService } from "./services/http.service";
import { NavigationService } from "./services/navigation.service";

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        ReversePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
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
