import random
import string

def getKey(key, json):
    try:
        return json[key]
    except KeyError as e:
        raise KeyError(key)

def get_unique_token(app):
    token = get_random_token();
    accounts = app.data.driver.db['users']
    lookup = {'token': token}
    while accounts.find_one(lookup):
        token = get_random_token()
    return token

def get_random_token():
	return ''.join(random.choice(string.ascii_uppercase)for x in range(30))
