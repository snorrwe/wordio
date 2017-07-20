import { TestBed, inject, async } from "@angular/core/testing";
import { NavigationEnd, Router } from "@angular/router";

import { NavigationService } from "./navigation.service";

describe("NavigationService tests", () => {
    let router: Router;

    beforeEach(() => {
        router = {} as any;
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

    it("can navigate", async(inject([NavigationService], (service: NavigationService) => {
        let last: string;
        (service as any).router.navigateByUrl = (url) => {
            last = url as string;
            return Promise.resolve(true);
        };
        return service.push("Kanga")
            .then(result => {
                expect(last).toBe("Kanga");
            })
            .catch(e => {
                fail(e);
            });
    })));

    describe("Event tests", () => {
        it("can navigate back to null", async(inject([NavigationService], (service: NavigationService) => {
            let last: string;
            (service as any).router.navigateByUrl = (url) => {
                last = url as string;
                return Promise.resolve(true);
            };
            service.push("Winnie");
            expect(service.current).toBe("Winnie");
            return service.pop()
                .then(result => {
                    expect(result).toBe("", "Should return empty string");
                    expect(last).toBe("", "Last navigation should be ''");
                })
                .catch(e => {
                    fail(e);
                });
        })));

        it("can navigate back", async(inject([NavigationService], (service: NavigationService) => {
            let last: string;
            (service as any).router.navigateByUrl = (url) => {
                last = url as string;
                return Promise.resolve(true);
            };
            service.push("Piglet");
            service.push("Winnie");
            expect(service.current).toBe("Winnie");
            return service.pop()
                .then(result => {
                    expect(result).toBe("Piglet");
                    expect(last).toBe("Piglet");
                })
                .catch(e => {
                    fail(e);
                });
        })));
    });
});
