import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';

import { AuthenticationService } from './services/authentication.service';
import { BoardService } from './services/board.service';
import { HttpService } from './services/http.service';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        AuthenticationService
        , BoardService
        , HttpService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
