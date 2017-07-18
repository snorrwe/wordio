export namespace Cache {
    const callCache: { [key: string]: Promise<any> } = {};

    const hashObject = function(object: any): string {
        if (!object || !(object instanceof Object)) return object;
        let result = typeof object;
        Object.keys(object)
            .forEach((key) => {
                result += hashObject(object[key]);
            });
        return result;
    };
    const getKey = function(...args: any[]) {
        let result = "";
        args.forEach((value: any) => {
            result += hashObject(value);
        });
        return result;
    };

    export const getNameByClass = function(cls: Object) {
        const regex = /function .*\(/;
        const results = regex.exec(cls.constructor.toString());
        let result = "UNKNOWN_CLASS";
        if (results && results.length) {
            result = results[0].replace("function ", "").replace("(", "");
        }
        return result;
    };

    const getLogger = function(className, propertyKey: string, options: { isEnabled?: boolean, logLevel?: LogLevels }) {
        const prefix = "[ " + className + " # " + propertyKey + " ]";
        if (!options.logLevel) options.logLevel = LogLevels.error;
        if (options.isEnabled)
            return function(level: string = "log", ...args: any[]) {
                if (LogLevels[level] <= options.logLevel) console[level](prefix, ...args);
            };
        else {
            return function() { };
        }
    };

    export enum LogLevels {
        none = 0
        , info = 4
        , log = 3
        , warn = 2
        , error = 1
    }

    export interface CachedPromiseOptions {
        enableLog?: boolean;
        logLevel?: LogLevels;
    }

    const processFuture = function(promise: Promise<any>, log: Function, cacheKey: string) {
        return promise
            .then((result) => {
                log("log", "resolved", result);
                delete callCache[cacheKey];
                return result;
            })
            .catch((error) => {
                log("error", "was rejected!", error);
                delete callCache[cacheKey];
                return Promise.reject(error);
            });
    };

    const cachedFunctionWrapper = function(target: Object, ogMethod: Function, cacheKey: string, log: Function, ...args: any[]) {
        log("log", "invoked cached method", ...args);
        if (callCache[cacheKey]) {
            log("log", "returns cached response", callCache[cacheKey]);
            return callCache[cacheKey];
        }
        let result = ogMethod.apply(target, args);
        if (result instanceof Promise) {
            log("log", "cached a request! Key", cacheKey);
            result = processFuture(result, log, cacheKey);
            callCache[cacheKey] = result;
        }
        log("log", "returns");
        return result;
    };

    export function CachedPromise(options: CachedPromiseOptions = {}) {
        return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            const ogMethod = descriptor.value;
            const className = getNameByClass(target);
            const log = getLogger(className, propertyKey, { isEnabled: options.enableLog, logLevel: options.logLevel });
            descriptor.value = function(...args) {
                const cacheKey = getKey(className, propertyKey, ...args);
                return cachedFunctionWrapper(target, ogMethod, cacheKey, log, ...args);
            };
            return descriptor;
        };
    }
}

export const CachedPromise = Cache.CachedPromise;
