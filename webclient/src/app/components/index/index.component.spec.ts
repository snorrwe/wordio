import { Component, Input, Output } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IndexComponent } from "./index.component";
import { GameService } from "../../services/game.service";

@Component({ selector: 'wordio-game-list-item', template: "" })
class GameItemMock {
    @Input() game: any;

    constructor(){
        GameItemMock.games.push(this);
    }

    static games = [];
}

describe("IndexComponent", () => {
    let component: IndexComponent;
    let fixture: ComponentFixture<IndexComponent>;
    let gameService: GameService;

    beforeEach(async(() => {
        GameItemMock.games = [];
        TestBed.configureTestingModule({
            declarations: [IndexComponent, GameItemMock],
            providers: [{ provide: GameService, useValue: {} as any }]
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
