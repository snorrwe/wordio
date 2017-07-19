import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Directive, Input, Component } from "@angular/core";
import { GameComponent } from "./game.component";
import { GameService } from "../../services/game.service";

@Directive({ selector: "[loaded]" })
class LoadedMockDirective {
    @Input() isLoading;
}

@Component({ selector: "wordio-board", template: "" })
class BoardMockComponent {
    @Input() board;
}

describe("GameComponent", () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    let gameService: GameService;
    let activatedRoute: ActivatedRoute;

    beforeEach(async(() => {
        activatedRoute = {
            params: {
                subscribe: () => { }
            }
        } as any;
        TestBed.configureTestingModule({
            declarations: [
                GameComponent
                , LoadedMockDirective
                , BoardMockComponent
            ],
            providers: [
                { provide: GameService, useValue: {} }
                , { provide: ActivatedRoute, useValue: activatedRoute }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        gameService = (component as any).gameService;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
