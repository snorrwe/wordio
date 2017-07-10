from functools import wraps

def log(name, message, tabs, tabChar):
    print("%s  %s %s " % (''.join([tabChar for i in range(4 * tabs)]), name, message))

functionStack = []
def log_stack(_name = None, **kwargs):
    tabChar = kwargs['tabChar'] if 'tabChar' in kwargs else ' '
    def inner_decorator(method):
        name = _name if _name is not None else method.__name__
        def wrapper(*args, **kwargs):
            try:
                log(name, "starting", len(functionStack), tabChar)
                functionStack.append(1)
                return method(*args, **kwargs)
            except:
                log(name, "error", len(functionStack) - 1, tabChar)
                raise
            finally:
                functionStack.pop()
                log(name, "finished", len(functionStack), tabChar)
        return wrapper
    return inner_decorator
