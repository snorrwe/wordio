import os
import sys
from eve import Eve
import settings
from src import register, login
from eve.auth import TokenAuth
SETTINGS_PATH = os.path.abspath(settings.__file__)

class WordioAuth(TokenAuth):
    def check_auth(self, token, allowed_roles, resource, method):
        accounts = app.data.driver.db['users']
        lookup = {'token': token}
        account = accounts.find_one(lookup)
        if account and '_id' in account:
            if 'users' in resource:
                self.set_request_auth_value(account['username'])
            else:
                self.set_request_auth_value(account['_id'])
        return account

app = Eve(auth = WordioAuth, settings=SETTINGS_PATH)

def enable_cors(app):
    try:
        from flask_cors import CORS
        CORS(app)
    except:
        pass

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

if __name__ == '__main__':
    logger = Logger("log.txt")
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

