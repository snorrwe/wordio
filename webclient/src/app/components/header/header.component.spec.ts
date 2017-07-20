import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { NavigationService } from "../../services/navigation.service";

describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let navigationService: NavigationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [{ provide: NavigationService, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        navigationService = (component as any).navigationService;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
        expect(navigationService).toBeTruthy();
    });
});
