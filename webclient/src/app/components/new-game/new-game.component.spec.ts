import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Pipe, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NewGameComponent } from "./new-game.component";
import { GameService } from "../../services/game.service";

@Pipe({ name: "translate" })
class TranslateMockPipe {
    transform(value) { return value; }
}

@Component({ selector: "wordio-board", template: "" })
class WordioBoardMock {
    static instance: WordioBoardMock;

    @Input("board") private board: any;
    @Output("onChange") private onChangeEmitter = new EventEmitter<any>();
    @Output("onTileSelect") private onTileSelectEmitter = new EventEmitter<any>();

    constructor() {
        WordioBoardMock.instance = this;
    }
}

describe("NewGameComponent", () => {
    let component: NewGameComponent;
    let fixture: ComponentFixture<NewGameComponent>;
    let gameService: GameService;
    let board: WordioBoardMock;

    afterAll(() => {
        if (fixture) {
            fixture.destroy();
        }
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NewGameComponent
                , WordioBoardMock
                , TranslateMockPipe
            ],
            providers: [{ provide: GameService, useValue: {} }],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewGameComponent);
        component = fixture.componentInstance;
        gameService = (component as any).gameService;
        fixture.detectChanges();
        board = WordioBoardMock.instance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
        expect(gameService).toBeTruthy();
        expect(board).toBeTruthy();
    });
});
