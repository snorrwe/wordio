import { TestBed, inject, async } from "@angular/core/testing";
import { NavigationEnd, Router } from "@angular/router";

import { NavigationService } from "./navigation.service";

describe("NavigationService tests", () => {
    let router: Router;

    beforeEach(() => {
        router = {
            events: {
                subscribe: () => { }
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
        let callback: Function;

        beforeEach(() => {
            router.events.subscribe = ((cb) => { callback = cb; return {} as any; }) as any;
        });

        it("can sets current after navigation", inject([NavigationService], (service: NavigationService) => {
            callback(new NavigationEnd(1, "", "Winnie"));
            expect(service.current).toBe("Winnie");
        }));

        it("can navigate back to null", async(inject([NavigationService], (service: NavigationService) => {
            let last: string;
            (service as any).router.navigateByUrl = (url) => {
                last = url as string;
                return Promise.resolve(true);
            };
            callback(new NavigationEnd(1, "Piglet", "Winnie"));
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
            callback(new NavigationEnd(1, "", "Piglet"));
            callback(new NavigationEnd(2, "Piglet", "Winnie"));
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
