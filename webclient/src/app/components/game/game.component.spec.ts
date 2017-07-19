import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Directive, Input } from "@angular/core";
import { GameComponent } from "./game.component";
import { GameService } from "../../services/game.service";

@Directive({ selector: "[loaded]" })
class LoadedMockDirective {
    @Input() isLoading;
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
            declarations: [GameComponent, LoadedMockDirective],
            providers: [{ provide: GameService, useValue: {} }, { provide: ActivatedRoute, useValue: activatedRoute }]
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
