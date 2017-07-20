import { TestBed, inject, async } from "@angular/core/testing";

import { AuthenticationService } from "./authentication.service";
import { EveHttpService, Urls } from "./http.service";

describe("AuthenticationService", () => {
    let service: AuthenticationService;
    let httpService: EveHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticationService, { provide: EveHttpService, useValue: {} }]
        });
    });

    beforeEach(inject([AuthenticationService], (srvc: AuthenticationService) => {
        service = srvc;
        httpService = (service as any).httpService;
    }));

    it("should be created", () => {
        expect(service).toBeTruthy();
        expect(httpService).toBeTruthy();
    });

    describe("login tests", () => {
        let postResult: Promise<any>;
        let postSpy: jasmine.Spy;

        beforeEach(() => {
            httpService.post = () => postResult;
        });

        it("should fill the body correctly", async(() => {
            postResult = Promise.resolve({ authToken: "token" });
            postSpy = spyOn(httpService, "post").and.returnValue(postResult);
            return service.login("winnie", "honeypot")
                .then(result => {
                    expect(postSpy).toHaveBeenCalled();
                    expect(postSpy).toHaveBeenCalledWith(Urls.API_BASE_URL + Urls.LOGIN, {
                        username: "winnie",
                        password: "honeypot"
                    });
                    expect(result).toBeTruthy();
                })
                .catch(error => {
                    fail(error);
                });
        }));

        it("should reject if username is missing", async(() => {
            postResult = Promise.resolve({ authToken: "token" });
            postSpy = spyOn(httpService, "post").and.returnValue(postResult);
            return service.login("", "honeypot")
                .then(result => {
                    fail("Should not resolve");
                })
                .catch(error => {
                    expect(error).toBe("Username cannot be null or empty!");
                    expect(postSpy).not.toHaveBeenCalled();
                });
        }));

        it("should reject if password is missing", async(() => {
            postResult = Promise.resolve({ authToken: "token" });
            postSpy = spyOn(httpService, "post").and.returnValue(postResult);
            return service.login("winnie", "")
                .then(result => {
                    fail("Should not resolve");
                })
                .catch(error => {
                    expect(error).toBe("Password cannot be null or empty!");
                    expect(postSpy).not.toHaveBeenCalled();
                });
        }));

        it("should resolve false if an error is raised", async(() => {
            postResult = Promise.reject("some error");
            postSpy = spyOn(httpService, "post").and.returnValue(postResult);
            return service.login("winnie", "lovebirds")
                .then(result => {
                    expect(postSpy).toHaveBeenCalled();
                    expect(result).toBeFalsy();
                })
                .catch(error => {
                    fail(error);
                });
        }));
    });
});
