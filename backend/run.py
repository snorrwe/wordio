import os
import sys
from eve import Eve
import settings
from src import register, login
from src.auth import WordioAuth
from flask import current_app
SETTINGS_PATH = os.path.abspath(settings.__file__)

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

app = Eve(auth = WordioAuth, settings=SETTINGS_PATH)

if __name__ == '__main__':
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
