import os
import sys
import pymongo
from eve import Eve
from flask import current_app
from flask import request, abort, make_response, jsonify
from flask_cors import CORS
from src.user.register import register as register_enpoint
from src.user.login import login as login_enpoint
from src.auth.auth import WordioAuth
from src.utility.logger import LogService
from src.domains.event_hooks.insert_tiles_by_games import insert_tiles_by_games
from src.domains.event_hooks.on_new_solution import on_new_solution
from src.domains.event_hooks.on_post_new_solution import on_post_new_solution
from src.custom.hello_endpoint import hello as hello_endpoint
from src import settings
SETTINGS_PATH = os.path.abspath(settings.__file__)

def bootstrap_app(app):
    CORS(app)
    __bootstrap_enpoints(app)
    __bootstrap_events(app)

def __bootstrap_enpoints(app):
    @app.route('/hello', methods=['GET'])
    def hello(): return hello_endpoint()
    @app.route('/login', methods=['POST'])
    def login(): return login_enpoint(app)
    @app.route('/register', methods=['POST'])
    def register(): return register_enpoint(app)

def __bootstrap_events(app):
    app.on_pre_POST_games += insert_tiles_by_games
    app.on_pre_POST_solutions += on_new_solution
    app.on_inserted_solutions += on_post_new_solution

def main():
    try:
        logger = LogService("log.txt")
        logger.debug("---------Starting----------")
        app = Eve(auth = WordioAuth, settings = SETTINGS_PATH)
        bootstrap_app(app)
        app.run()
    except:
        error = sys.exc_info()[0]
        print("Error in main %s" % (error))
        print(str(error))
        if logger:
            logger.error(error)

if __name__ == '__main__':
    main()
