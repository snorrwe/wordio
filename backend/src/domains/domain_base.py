DOMAINS = []

def domain(cls):
    try:
        dict = cls.__dict__
        dict["name"]
        dict["domain"]
        DOMAINS.append(cls)
        return cls
    except KeyError:
        raise KeyError("Missing key in file. Required: 'name':str, 'domain':{}")
