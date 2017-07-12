import { Cache } from './cache.decorator';

let getClassName = Cache.getNameByClass;

class LocalStorageService {
    private static _instance: LocalStorageService;
    static get instance(): LocalStorageService {
        if (!this._instance) this._instance = new LocalStorageService();
        return this._instance;
    }

    private storage: Storage;
    private cache: { [key: string]: any };

    constructor() {
        this.storage = localStorage;
        this.cache = {};
    }

    get<T>(key: string): T {
        if (this.cache[key]) return this.cache[key];
            let value: any;
        try {
            value = this.storage.getItem(key);
            if (value === 'undefined') return null;
            return JSON.parse(value) as T;
        } catch (e) {
            console.error("Error while getting key from localStorage", e, value);
            this.remove(key);
            return null;
        }
    }

    set(key: string, value: any): void {
        this.storage.setItem(key, JSON.stringify(value));
        this.cache[key] = value;
    }

    remove(key: string) {
        this.storage.removeItem(key);
    }
}

export function LocalStorage(keyPrefix?: string) {
    return (target: Object, propertyKey: string) => {
        let storageKey = keyPrefix + getClassName(target) + "#" + propertyKey;
        Object.defineProperty(target, propertyKey, {
            get: function() {
                return LocalStorageService.instance.get(storageKey);
            }
            , set: function(v: any) {
                LocalStorageService.instance.set(storageKey, v);
            }
        });
    }
}