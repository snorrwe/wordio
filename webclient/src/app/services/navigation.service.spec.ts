import { TestBed, inject, async } from "@angular/core/testing";
import { NavigationEnd, Router } from "@angular/router";

import { NavigationService } from "./navigation.service";

describe("NavigationService tests", () => {
    let router: Router;

    beforeEach(() => {
        router = {
            events: {
                subscribe: () => {}
            }
        } as any;
        TestBed.configureTestingModule({
            providers: [
                NavigationService
                , { provide: Router, useValue: router }
            ]
        });
    });

    it("should be created", inject([NavigationService], (service: NavigationService) => {
        expect(service).toBeTruthy();
    }));
});
