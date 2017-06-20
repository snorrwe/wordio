import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { HttpService } from './http.service';

var httpService: Http = {} as any;

describe('HttpService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [HttpService, { provide: Http, useValue: httpService}]
		});
	});

	it('should be created', inject([HttpService], (service: HttpService) => {
		expect(service).toBeTruthy();
	}));
});
