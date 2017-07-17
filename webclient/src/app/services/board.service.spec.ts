import { TestBed, inject } from "@angular/core/testing";

import { BoardService } from "./board.service";
import { EveHttpService } from "./http.service";

describe("BoardService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BoardService
                , { provide: EveHttpService, useValue: {} }
            ]
        });
    });

    it("should be created", inject([BoardService], (service: BoardService) => {
        expect(service).toBeTruthy();
    }));
});
