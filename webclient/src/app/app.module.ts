import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';

import { ReversePipe } from './pipes/reverse.pipe';

import { AuthenticationService } from './services/authentication.service';
import { BoardService } from './services/board.service';
import { EveHttpService } from './services/http.service';

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
        , BoardService
        , EveHttpService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
