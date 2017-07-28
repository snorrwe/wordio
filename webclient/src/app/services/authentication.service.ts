import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LocalStorage } from "../decorators/localstorage.decorator";
import { EveHttpService, Urls } from "./http.service";
import { NavigationService } from "./navigation.service";

@Injectable()
export class AuthenticationService implements CanActivate {

    @LocalStorage("authenticationService#") private authToken: string;
    private isLoggedin = false;

    constructor(private httpService: EveHttpService, private navigationService: NavigationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        let result = Promise.resolve(false);
        if (this.isLoggedin) {
            return Promise.resolve(true);
        }
        return this.checkAuthToken()
            .then(result => {
                if (!result) {
                    this.navigationService.push("login")
                }
                return result;
            });
    }

    private checkAuthToken(): Promise<boolean> {
        if (!this.authToken) return Promise.resolve(false);
        this.httpService.setAuthentication(this.authToken);
        return this.httpService.get(Urls.API_BASE_URL)
            .then(response => {
                this.isLoggedin = response != null;
                return this.isLoggedin;
            })
            .catch(error => {
                console.error("Error while checking authorization", error);
                this.authToken = null;
                return false;
            });
    }

    login(username, password): Promise<boolean> {
        if (!username) return Promise.reject("Username cannot be null or empty!");
        if (!password) return Promise.reject("Password cannot be null or empty!");
        return this.httpService.post<{ authToken: string }>(Urls.API_BASE_URL + Urls.LOGIN, {
            username: username,
            password: password
        })
            .then(response => {
                if (response && response.authToken) {
                    this.authToken = response.authToken;
                    this.isLoggedin = true;
                }
                return true;
            })
            .catch(error => {
                console.error("Error while logging in", error);
                return false;
            });
    }

    logout() {
        this.authToken = null;
    }
}
