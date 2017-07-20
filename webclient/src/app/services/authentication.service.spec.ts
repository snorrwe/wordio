import { TestBed, inject } from "@angular/core/testing";

import { AuthenticationService } from "./authentication.service";
import { EveHttpService } from "./http.service";

describe("AuthenticationService", () => {
    let httpService: EveHttpService;
    beforeEach(() => {
        httpService = {} as any;
        TestBed.configureTestingModule({
            providers: [AuthenticationService, {provide: EveHttpService, useValue: httpService}]
        });
    });

    it("should be created", inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));
});
