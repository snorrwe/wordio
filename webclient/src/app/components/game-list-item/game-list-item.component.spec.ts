import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { GameListItemComponent } from "./game-list-item.component";

import { NavigationService } from "../../services/navigation.service";

describe("GameListItemComponent", () => {
    let component: GameListItemComponent;
    let fixture: ComponentFixture<GameListItemComponent>;
    let navigationService: NavigationService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [GameListItemComponent]
            , providers: [{ provide: NavigationService, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameListItemComponent);
        component = fixture.componentInstance;
        navigationService = (component as any).navigationService;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    it("onClick test", () => {
        navigationService.push = () => Promise.resolve(true);
        let navspy = spyOn(navigationService, "push");
        (component as any).game = {_id: "kanga"}
        component.onClick();
        expect(navspy).toHaveBeenCalled();
        expect(navspy).toHaveBeenCalledWith("games/" + "kanga");
    });
});
