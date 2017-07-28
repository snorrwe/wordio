import { Component, OnInit } from "@angular/core";

import { AuthenticationService } from "../../services/authentication.service";
import { NavigationService } from "../../services/navigation.service";

@Component({
    selector: "wordio-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    private username: string;
    private password: string;

    private usernameErrors: string[] = [];
    private passwordErrors: string[] = [];

    constructor(private authService: AuthenticationService, private navService: NavigationService) { }

    ngOnInit() {
        if (this.authService.canActivate()) {
            this.navService.pop();
        }
    }

    login() {
        this.usernameErrors = [];
        this.passwordErrors = [];
        this.authService.login(this.username, this.password)
            .then(result => {
                if (result) {
                    this.navService.pop();
                }
            })
            .catch(error => {
                console.error("loginerror", error);
            });
    }
}
