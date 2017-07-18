import { Injectable } from "@angular/core";

import { CachedPromise } from "../decorators/cache.decorator";
import { Http, Response } from "@angular/http";

import "rxjs/Rx";

export interface CollectionDto<T>{
    _items: T[];
}

export interface IQueryParam{
    key: string;
    value: any;
}

@Injectable()
export class EveHttpService {

    constructor(private http: Http) { }

    @CachedPromise()
    get<T>(url: string, ...queryParams: IQueryParam[]): Promise<T> {
        url += this.parseQueryParams(...queryParams);
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
    delete<T>(url: string, ...queryParams: IQueryParam[]): Promise<T> {
        url += this.parseQueryParams(...queryParams);
        return this.http.delete(url)
            .toPromise()
            .then(result => {
                return this.parseResponse<T>(result);
            });
    }

    private parseQueryParams(...queryParams: IQueryParam[]): string{
        if(!queryParams || !queryParams.length) return "";
        let result = "?";
        for(let param of queryParams){
            result += param.key + "=" + JSON.stringify(param.value);
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
