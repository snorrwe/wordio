from flask import request, abort, make_response, jsonify
from .utility import *
from werkzeug.security import check_password_hash


class Login(object):
    def __init__(self, app):
        self.app = app
        self.users = app.data.driver.db['users']
        self.lookup = {
            "username": ""
        }

    def login(self):
        (username, password) = self.get_login_data_from_current_request()
        user = self.users.find_one(self.lookup) 
        if user and check_password_hash(user["password"], password):
            return self.set_unique_token(user)
        else:
            abort(make_response(jsonify(error="Invalid credentials"), 500))
        
    def get_login_data_from_current_request(self):
        try:
            json = request.get_json(force=True)
            (username, password) = getKeys(json, "username", "password")
            self.ensure_data_integrity(username = username, password = password)
            self.lookup["username"] = username
            return (username, password)
        except KeyError as e:
            abort(make_response(jsonify(missingKey=str(e)), 500))

    def set_unique_token(self, user):
        token = get_unique_token(self.app)
        user["token"] = token
        self.users.update(self.lookup, user)
        return jsonify(authToken=token)

    def ensure_data_integrity(self, **kwargs):
        for key in kwargs:
            if(key not in kwargs or len(kwargs[key]) == 0):
                raise KeyError(key)

def login(app):
    return Login(app).login()
