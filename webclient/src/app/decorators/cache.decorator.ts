export module Cache {
    const callCache: { [key: string]: Promise<any> } = {}
    const getKey = (...args: any[]) => {
        let result = '';
        args.forEach((value: any) => {
            result += hashObject(value);
        });
        return result;
    }

    const hashObject = (object: any): string => {
        if (!object || !(object instanceof Object)) return object;
        let result = typeof object;
        Object.keys(object)
            .forEach((key) => {
                result += hashObject(object[key]);
            });
        return result;
    }

    export const getNameByClass = function(cls: Object) {
        let regex = /function .*\(/;
        let results = regex.exec(cls.constructor.toString());
        let result = "UNKNOWN_CLASS";
        if (results && results.length) {
            result = results[0].replace("function ", "").replace("(", "");
        }
        return result;
    }

    const getLogger = function(className, propertyKey: string, options: { isEnabled?: boolean, logLevel?: LogLevels }) {
        let prefix = "[ " + className + " # " + propertyKey + " ]";
        if (!options.logLevel) options.logLevel = LogLevels.error;
        if (options.isEnabled)
            return function(level: string = "log", ...args: any[]) {
                if (LogLevels[level] <= options.logLevel) console[level](prefix, ...args);
            }
        else {
            return function() { }
        }
    }

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

    export function CachedPromise(options: CachedPromiseOptions = {}) {
        return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            let ogMethod: (...args: any[]) => Promise<any> = descriptor.value;
            let className = getNameByClass(target);
            let log = getLogger(className, propertyKey, { isEnabled: options.enableLog, logLevel: options.logLevel });
            descriptor.value = function(...args) {
                let cacheKey = getKey(className, propertyKey, ...args);
                return cachedFunctionWrapper(ogMethod, cacheKey, ...args);
            }
            return descriptor;
        }
    }

    const cachedFunctionWrapper = function(ogMethod: Function, cacheKey: string, ...args: any[]) {
        log("info", "invoked cached method", ...args);
        if (callCache[cacheKey]) {
            log("info", "returns cached response", callCache[cacheKey]);
            return callCache[cacheKey];
        }
        let result = ogMethod.apply(this, args);
        if (result instanceof Promise) {
            log("info", "cached a request! Key", cacheKey);
            result = processFuture(result, log, cacheKey);
            callCache[cacheKey] = result;
        }
        log("info", "returns");
        return result;
    }

    const processFuture = (promise: Promise<any>, log: Log, cacheKey: string) => {
        return promise
            .then((result) => {
                log("info", "resolved", result);
                delete callCache[cacheKey];
                return result;
            })
            .catch((error) => {
                log("error", "was rejected!", error);
                delete callCache[cacheKey];
                return Promise.reject(error);
            });
    }
}

export const CachedPromise = Cache.CachedPromise;
