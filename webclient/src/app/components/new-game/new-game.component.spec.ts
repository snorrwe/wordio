import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Pipe, PipeTransform, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NewGameComponent } from "./new-game.component";
import { GameService } from "../../services/game.service";
import { BoardInputComponent, IBoardParameters } from "./board-input/board-input.component";

@Pipe({ name: "translate" })
class TranslateMockPipe implements PipeTransform {
    transform(value) { return value; }
}

@Component({ selector: "wordio-board-input", template: "" })
class BoardInputMockComponent {
    @Output("onParameterChange") onParameterChangeEmitter = new EventEmitter<IBoardParameters>();
    @Input("board") board: any;
}

@Component({ selector: "wordio-board", template: "" })
class WordioBoardMockComponent {
    static instance: WordioBoardMockComponent;

    @Input("board") private board: any;
    @Output("onChange") private onChangeEmitter = new EventEmitter<any>();
    @Output("onTileSelect") private onTileSelectEmitter = new EventEmitter<any>();

    constructor() {
        WordioBoardMockComponent.instance = this;
    }
}

describe("NewGameComponent", () => {
    let component: NewGameComponent;
    let fixture: ComponentFixture<NewGameComponent>;
    let gameService: GameService;
    let board: WordioBoardMockComponent;

    afterAll(() => {
        if (fixture) {
            fixture.destroy();
        }
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NewGameComponent
                , WordioBoardMockComponent
                , TranslateMockPipe
                , BoardInputMockComponent
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
        board = WordioBoardMockComponent.instance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
        expect(gameService).toBeTruthy();
        expect(board).toBeTruthy();
    });
});
