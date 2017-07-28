import { Injectable } from "@angular/core";

import { CachedPromise } from "../decorators/cache.decorator";
import { Http, Response, URLSearchParams, RequestOptions, Headers } from "@angular/http";

import { Subject } from "rxjs/Rx";

export interface CollectionDto<T> {
    _items: T[];
}

export interface IQueryParam {
    key: string;
    value: any;
}

export { Urls } from "./http/urls";

@Injectable()
export class EveHttpService {

    private headers: Headers = new Headers();
    private onErrorSubject = new Subject<any>();
    get onError() { return this.onErrorSubject.asObservable(); }

    constructor(private http: Http) { }

    setAuthentication(token: string) {
        this.headers.set("Authorization", token);
    }

    @CachedPromise()
    get<T>(url: string, ...queryParams: IQueryParam[]): Promise<T> {
        return this.makeRequest<T>(this.http.get, url, ...queryParams);
    }

    @CachedPromise()
    post<T>(url: string, body: any): Promise<T> {
        return this.http.post(url, body, { headers: this.headers })
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            })
            .catch(error => {
                this.onErrorSubject.next(error);
                return Promise.reject(error);
            });;
    }

    @CachedPromise()
    delete<T>(url: string, ...queryParams: IQueryParam[]): Promise<T> {
        return this.makeRequest<T>(this.http.delete, url, ...queryParams);
    }

    private makeRequest<T>(request: Function, url: string, ...queryParams: IQueryParam[]) {
        return request.apply(this.http, [url, {
            params: this.parseQueryParams(...queryParams)
            , headers: this.headers
        }])
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            })
            .catch(error => {
                this.onErrorSubject.next(error);
                return Promise.reject(error);
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
