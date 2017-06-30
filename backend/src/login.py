from flask import request, abort, make_response, jsonify
from .utility import *
from werkzeug.security import check_password_hash

def login(app):
    try:
        json = request.get_json(force=True)
        username = getKey("username", json)
        password = getKey("password", json)
        if len(username) == 0:
            raise KeyError("username")
        if len(password) == 0:
            raise KeyError("password")
        users = app.data.driver.db['users']
        lookup = {
            "username": username
        }
        user = users.find_one(lookup)
        if user and check_password_hash(user["password"], password):
            token = get_unique_token(app)
            user["token"] = token
            users.update(lookup, user)
            return jsonify(authToken=token)
        else:
            abort(make_response(jsonify(error="Invalid credentials"), 500))
    except KeyError as e:
        abort(make_response(jsonify(missingKey=str(e)), 500))
    except:
        import sys
        error = sys.exc_info()[0]
        print("Error in login %s" % error)
        raise
        