import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { EveHttpService } from './http.service';

describe('BoardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BoardService
                , { provide: EveHttpService, useValue: {} }
            ]
        });
    });

    it('should be created', inject([BoardService], (service: BoardService) => {
        expect(service).toBeTruthy();
    }));

    describe('getBoard tests', () => {

        let httpMock: any;
        let service: BoardService;

        beforeEach(inject([BoardService, EveHttpService], (s: BoardService, h: any) => {
            service = s;
            httpMock = h;
        }));

        it('should fetch the board from the server', (done) => {
            let callcount = 0;
            httpMock.get = (...args: any[]) => { callcount++; return Promise.resolve(); };

            service.getBoard("1")
                .then(result => {
                    expect(callcount).toBe(1);
                })
                .catch(e => {
                    fail(e);
                })
                .then(() => {
                    done();
                });
        });
    });
});
