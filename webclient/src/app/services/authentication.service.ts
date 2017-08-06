import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Subject } from "rxjs/Rx";

import { LocalStorage } from "../decorators/localstorage.decorator";
import { EveHttpService, Urls } from "./http.service";
import { NavigationService } from "./navigation.service";

@Injectable()
export class AuthenticationService implements CanActivate {

    @LocalStorage("authenticationService#") private authToken: string;
    private _isLoggedin = false;
    private get isLoggedin() { return this._isLoggedin; }
    private set isLoggedin(value) {
        this._isLoggedin = value;
        this.onLoginChangeSubject.next(value);
    }
    private onLoginChangeSubject = new Subject<boolean>();
    get onLoginChange() { return this.onLoginChangeSubject.asObservable(); }

    constructor(private httpService: EveHttpService, private navigationService: NavigationService) {
        this.httpService.onError.subscribe(error => {
            if (error.status && error.status === 401 && this.isLoggedin) {
                this.logout();
            }
        });
    }

    canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<boolean> {
        if (this.isLoggedin) {
            return Promise.resolve(true);
        }
        return this.checkAuthToken()
            .then(result => {
                if (!result) {
                    this.navigationService.push("login");
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
        if (!username) return Promise.reject("USERNAME_EMPTY");
        if (!password) return Promise.reject("PASSWORD_EMPTY");
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
        this.isLoggedin = false;
    }
}
