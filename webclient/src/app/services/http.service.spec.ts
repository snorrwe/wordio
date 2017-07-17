import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { EveHttpService } from './http.service';

const httpService: Http = {} as any;

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EveHttpService, { provide: Http, useValue: httpService}]
        });
    });

    it('should be created', inject([EveHttpService], (service: EveHttpService) => {
        expect(service).toBeTruthy();
    }));
});
