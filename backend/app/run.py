import os
import sys
from eve import Eve
import settings
from src.user import register, login
from src.auth.auth import WordioAuth
from src.logger import Logger
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
    
    @app.route('/hello', methods=['GET'])
    def hello():
        return '''{
    "status": "up&running"         
}'''

    @app.route('/login', methods=['POST'])
    def lgn():
        return login.login(app)

    @app.route('/register', methods=['POST'])
    def reg():
        return register.register(app)

    logger = Logger("log.txt")
    main(logger, app)
