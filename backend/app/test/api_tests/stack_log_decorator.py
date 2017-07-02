def log(name, message, tabs):
    print("%s____ %s %s ____" % (''.join([' ' for i in range(4 * tabs)]), name, message))

functionStack = []
def log_stack(name):
    def inner_decorator(method):
        def wrapper(*args, **kwargs):
            try:
                log(name, "starting", len(functionStack))
                functionStack.append("")
                return method(*args, **kwargs)
            except:
                log(name, "error", len(functionStack) - 1)
                raise
            finally:
                functionStack.pop()
                log(name, "finished", len(functionStack))
        return wrapper
    return inner_decorator
