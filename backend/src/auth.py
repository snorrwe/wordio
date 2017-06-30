from eve.auth import TokenAuth

class WordioAuth(TokenAuth):
    def check_auth(self, token, allowed_roles, resource, method):
        accounts = self.current_app.data.driver.db['users']
        lookup = {'token': token}
        account = accounts.find_one(lookup)
        return WordioTokenAuth(current_app, self).check_user_token(token, allowed_roles, resource, method, accounts)

class WordioTokenAuth(object):
    def __init__(self, auth):
        self.auth = auth

    def check_user_token(self, token, allowed_roles, resource, method, account):
        if account and '_id' in account:
            if 'users' in resource:
                self.auth.set_request_auth_value(account['username'])
            else:
                self.auth.set_request_auth_value(account['_id'])
        return account
