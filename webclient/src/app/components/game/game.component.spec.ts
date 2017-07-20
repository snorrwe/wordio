import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Directive, Input, Component } from "@angular/core";
import { GameComponent } from "./game.component";
import { GameService } from "../../services/game.service";
import { NavigationService } from "../../services/navigation.service";


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
    let navigationService: NavigationService;
    let activatedRoute: ActivatedRoute;

    beforeEach(async(() => {
        const activatedRouteInitialValue = {
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
                , { provide: ActivatedRoute, useValue: activatedRouteInitialValue }
                , { provide: NavigationService, useValue: {} }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        gameService = (component as any).gameService;
        navigationService = (component as any).navigationService;
        activatedRoute = (component as any).activatedRoute;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
        expect(gameService).toBeTruthy();
        expect(navigationService).toBeTruthy();
        expect(activatedRoute).toBeTruthy();
    });
});
