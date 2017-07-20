import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class NavigationService {
    private readonly navigationStack: string[] = [];
    get current(): string { return this.navigationStack[this.navigationStack.length - 1]; }

    constructor(private router: Router) {}

    push(url: string): Promise<boolean> {
        if (this.current !== url) {
            this.navigationStack.push(url);
        }
        return this.router.navigateByUrl(url);
    }

    pop(): Promise<string | boolean> {
        if (!this.navigationStack.length) return null;
        this.navigationStack.pop();
        const result = this.current || "";
        return this.router.navigateByUrl(result)
            .then(success => {
                if (success) {
                    return result;
                }
                return success;
            })
            .catch(e => {
                console.error("Error while navigating to url", result, e);
                return Promise.reject(e);
            });
    }
}
