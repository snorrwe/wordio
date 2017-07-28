import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Pipe, PipeTransform } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { AuthenticationService } from "../../services/authentication.service";
import { NavigationService } from "../../services/navigation.service";

@Pipe({
    name: "translate"
})
class TranslateMockPipe implements PipeTransform {
    transform(value) { return value; }
}

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceMock: AuthenticationService;
    let navServiceMock: NavigationService;

    beforeEach(async(() => {
        const authService = {};
        TestBed.configureTestingModule({
            declarations: [LoginComponent, TranslateMockPipe],
            providers: [
                { provide: AuthenticationService, useValue: { canActivate: () => {} } }
                , { provide: NavigationService, useValue: {} }
            ],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authServiceMock = (component as any).authService;
        navServiceMock = (component as any).navService;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
        expect(authServiceMock).toBeTruthy();
        expect(navServiceMock).toBeTruthy();
    });
});
