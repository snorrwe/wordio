functionStack = []
def log_stack(name):
    def inner_decorator(method):
        def wrapper(*args, **kwargs):
            print("%s_____ %s starting _____" % (''.join([' ' for i in range(len(functionStack) * 5)]), name))
            functionStack.append("")
            result = method(*args, **kwargs)
            functionStack.pop()
            print("%s_____ %s finished _____\n" % (''.join([' ' for i in range(len(functionStack) * 5)]), name))
            return result
        return wrapper
    return inner_decorator
