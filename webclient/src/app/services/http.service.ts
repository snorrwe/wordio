import { Injectable } from "@angular/core";

import { CachedPromise } from "../decorators/cache.decorator";
import { Http, Response, URLSearchParams, RequestOptions } from "@angular/http";

import "rxjs/Rx";

export interface CollectionDto<T> {
    _items: T[];
}

export interface IQueryParam {
    key: string;
    value: any;
}

@Injectable()
export class EveHttpService {

    constructor(private http: Http) { }

    @CachedPromise()
    get<T>(url: string, ...queryParams: IQueryParam[]): Promise<T> {
        return this.makeRequest<T>(this.http.get, url, ...queryParams);
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
    delete<T>(url: string, ...queryParams: IQueryParam[]): Promise<T> {
        return this.makeRequest<T>(this.http.delete, url, ...queryParams);
    }

    private makeRequest<T>(request: Function, url: string, ...queryParams: IQueryParam[]) {
        return request(url, { params: this.parseQueryParams(...queryParams) })
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            });
    }

    private parseQueryParams(...queryParams: IQueryParam[]): URLSearchParams {
        const result = new URLSearchParams();
        for (const param of queryParams) {
            result.set(param.key, JSON.stringify(param.value));
        }
        return result;
    }

    private parseResponse<TReturn>(response: Response): Promise<TReturn> {
        try {
            const body = response.json();
            return Promise.resolve(body as TReturn);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
