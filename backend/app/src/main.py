import os
import sys
from eve import Eve
import settings
from .user import register, login
from .auth.auth import WordioAuth
from .utility.logger import LogService
from .domains.event_hooks.insert_hosts_by_solutions import insert_hosts_by_solutions
from .domains.event_hooks.insert_tiles_by_games import insert_tiles_by_games
from .custom.hello_endpoint import hello
from flask import current_app
from flask import request, abort, make_response, jsonify
import pymongo
SETTINGS_PATH = os.path.abspath(settings.__file__)

def enable_cors(app):
    try:
        from flask_cors import CORS
        CORS(app)
    except:
        pass

def start_app(app):
    try:
        logger = LogService("log.txt")
        logger.debug("Starting")
        enable_cors(app)
        app.run()
    except:
        error = sys.exc_info()[0]
        print("Error in main %s" % error)
        if logger:
            logger.error(error)

app = Eve(auth = WordioAuth, settings=SETTINGS_PATH)

@app.route('/hello', methods=['GET'])
def hello_controller():
    return hello()

@app.route('/login', methods=['POST'])
def login_controller():
    return login.login(app)

@app.route('/register', methods=['POST'])
def register_controller():
    return register.register(app)

app.on_pre_POST_games += insert_tiles_by_games
app.on_pre_POST_solutions += insert_hosts_by_solutions

def main():
    start_app(app)
    
if __name__ == '__main__':
    main()