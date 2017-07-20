import { Component, Input, Output, Directive, Pipe, PipeTransform } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IndexComponent } from "./index.component";
import { GameService } from "../../services/game.service";
import { NavigationService } from "../../services/navigation.service";

@Component({ selector: "wordio-game-list-item", template: "" })
class GameItemMockComponent {
    static games = [];

    @Input() game: any;

    constructor() {
        GameItemMockComponent.games.push(this);
    }
}

@Directive({ selector: "[loaded]" })
class LoadedMockDirective {
    @Input() isLoading;
}

@Pipe({name: "translate"})
class TranslateMockPipe implements PipeTransform{
    transform(value){return value;}
}

describe("IndexComponent", () => {
    let component: IndexComponent;
    let fixture: ComponentFixture<IndexComponent>;
    let gameService: GameService;
    let navigationService: NavigationService
    const gameServiceMock: GameService = {} as any;

    beforeEach(async(() => {
        GameItemMockComponent.games = [];
        gameServiceMock.listGames = () => Promise.resolve([]);
        TestBed.configureTestingModule({
            declarations: [
                IndexComponent
                , GameItemMockComponent
                , LoadedMockDirective
                , TranslateMockPipe
            ],
            providers: [
                { provide: GameService, useValue: gameServiceMock }
                , { provide: NavigationService, useValue: {} }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
        gameService = (component as any).gameService;
        navigationService = (component as any).navigationService;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
