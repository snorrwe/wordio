import os
import sys
import pymongo
from eve import Eve
from flask import current_app
from flask import request, abort, make_response, jsonify
from src.user import register, login
from src.auth.auth import WordioAuth
from src.utility.logger import LogService
from src.domains.event_hooks.insert_tiles_by_games import insert_tiles_by_games
from src.domains.event_hooks.on_new_solution import on_new_solution
from src.domains.event_hooks.on_post_new_solution import on_post_new_solution
from src.custom.hello_endpoint import hello
from src import settings
SETTINGS_PATH = os.path.abspath(settings.__file__)

def enable_cors(app):
    try:
        from flask_cors import CORS
        CORS(app)
    except ImportError:
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

app = Eve(auth = WordioAuth, settings = SETTINGS_PATH)

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
app.on_pre_POST_solutions += on_new_solution
app.on_inserted_solutions += on_post_new_solution

def main():
    start_app(app)

if __name__ == '__main__':
    main()
