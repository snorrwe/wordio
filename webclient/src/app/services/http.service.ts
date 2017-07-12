import { Injectable } from '@angular/core';

import { CachedPromise } from '../decorators/cache.decorator'
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class HttpService {

    constructor(private http: Http) { }

    @CachedPromise()
    get<T>(url: string, ...queryParams: { key: string, value: string }[]): Promise<T> {
        if (url.indexOf("?") < 0) url += "?";
        for (let param of queryParams) {
            url += param.key + "=" + param.value + "&";
        }
        return this.http.get(url)
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            });
    }

    @CachedPromise()
    post<T>(url: string, body: any): Promise<T> {
        return this.http.post(url, body)
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            });
    }

    @CachedPromise()
    delete<T>(url: string): Promise<T> {
        return this.http.delete(url)
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            });
    }

    private parseResponse<TReturn>(response: Response): Promise<TReturn> {
        try {
            return response.json();
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
