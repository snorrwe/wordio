from eve import Eve
from flask import request, abort, make_response, jsonify
import sys, os
from .utility import *
from werkzeug.security import generate_password_hash

def register(app):
    try:
        json = request.get_json(force=True)
        username = getKey("username", json)
        password = getKey("password", json)
        displayName = getKey("displayName", json)
        users = app.data.driver.db['users']
        token = get_unique_token(app)
        if(users.find_one({"username": username})):
            abort(make_response(jsonify(takenKey="username"), 500))
        if(users.find_one({"displayName": displayName})):
            abort(make_response(jsonify(takenKey="displayName"), 500)) 
        result = users.insert([{
                    "username": username
                    , "password": generate_password_hash(password)
                    , "displayName": displayName
                    , "token": token
                }])
        if result:
            return jsonify(authToken=token)
    except KeyError as e:
        abort(make_response(jsonify(missingKey=str(e)), 500))
    except:
        import sys
        error = sys.exc_info()[0]
        print("Error in register %s" % error)
        raise
