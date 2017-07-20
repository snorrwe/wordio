import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewGameComponent } from "./new-game.component";
import { GameService } from "../../services/game.service";

describe("NewGameComponent", () => {
    let component: NewGameComponent;
    let fixture: ComponentFixture<NewGameComponent>;
    let gameService: GameService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewGameComponent],
            providers: [{ provide: GameService, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewGameComponent);
        component = fixture.componentInstance;
        gameService = (component as any).gameService;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
        expect(gameService).toBeTruthy();
    });
});
