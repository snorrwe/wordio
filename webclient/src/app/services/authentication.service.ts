import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LocalStorage } from "../decorators/localstorage.decorator";
import { EveHttpService, Urls } from "./http.service";

@Injectable()
export class AuthenticationService implements CanActivate {

    @LocalStorage("authenticationService#") private authToken: string;
    private isLoggedin = false;

    constructor(private httpService: EveHttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        if (this.isLoggedin) return this.isLoggedin;
        this.httpService.setAuthentication(this.authToken);
        return this.httpService.get(Urls.API_BASE_URL)
            .then(response => {
                this.isLoggedin = response != null;
                return this.isLoggedin;
            })    
            .catch(error => {
                console.error("Error while checking authorization", error);
                return false;
            });
    }
}
