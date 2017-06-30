import os
import sys
from eve import Eve
import settings
from src import register, login
from eve.auth import TokenAuth
from flask import current_app
SETTINGS_PATH = os.path.abspath(settings.__file__)

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

def enable_cors(app):
    try:
        from flask_cors import CORS
        CORS(app)
    except:
        pass

def main(logger, app):
    try:
        logger.log("Starting")
        enable_cors(app)
        app.run()
    except:
        error = sys.exc_info()[0]
        print("Error in main %s" % error)
        if logger:
            logger.log("Error")
            logger.log(error)

if __name__ == '__main__':
    
    app = Eve(auth = WordioAuth, settings=SETTINGS_PATH)

    @app.route('/login', methods=['POST'])
    def lgn():
        return login.login(app)

    @app.route('/register', methods=['POST'])
    def reg():
        return register.register(app)
       
    class Logger(object):
        def __init__(self, logfileName):
            self.logfileName = logfileName

        def log(self, message):
            with open(self.logfileName, "w+") as f:
                f.write(message)

    logger = Logger("log.txt")
    main(logger, app)
