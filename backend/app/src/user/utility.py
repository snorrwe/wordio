from secrets import token_hex

def getKey(key, json):
    try:
        return json[key]
    except KeyError as e:
        raise KeyError(key)

def getKeys(json, *keys):
    result = []
    for key in keys:
        result.append(getKey(key, json))
    return tuple(result)

def get_unique_token(app):
    token = get_random_token();
    accounts = app.data.driver.db['users']
    lookup = {'token': token}
    while accounts.find_one(lookup):
        token = get_random_token()
    return token

def get_random_token():
    return token_hex(20)
