functionStack = []
def log_stack(name):
    def inner_decorator(method):
        def wrapper(*args, **kwargs):
            try:
                print("%s_____ %s starting _____" % (''.join([' ' for i in range(len(functionStack) * 5)]), name))
                functionStack.append("")
                return method(*args, **kwargs)
            except:
                print("%s_____ %s error _____\n" % (''.join([' ' for i in range(len(functionStack) * 5)]), name))
                raise
            finally:
                functionStack.pop()
                print("%s_____ %s finished _____\n" % (''.join([' ' for i in range(len(functionStack) * 5)]), name))
            return result
        return wrapper
    return inner_decorator
