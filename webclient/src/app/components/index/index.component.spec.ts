import { Component, Input, Output } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IndexComponent } from "./index.component";
import { GameService } from "../../services/game.service";

@Component({ selector: "wordio-game-list-item", template: "" })
class GameItemMockComponent {
    static games = [];

    @Input() game: any;

    constructor() {
        GameItemMockComponent.games.push(this);
    }
}

describe("IndexComponent", () => {
    let component: IndexComponent;
    let fixture: ComponentFixture<IndexComponent>;
    let gameService: GameService;
    const gameServiceMock: GameService = {} as any;

    beforeEach(async(() => {
        GameItemMockComponent.games = [];
        gameServiceMock.listGames = () => Promise.resolve([]);
        TestBed.configureTestingModule({
            declarations: [IndexComponent, GameItemMockComponent],
            providers: [{ provide: GameService, useValue: gameServiceMock }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
        gameService = (component as any).gameService;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
