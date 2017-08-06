from flask import current_app as app
from flask import abort, make_response, jsonify
from bson.objectid import ObjectId

def add_host_to_game(request):
    authToken = list(filter(lambda header: header[0] == "Authorization", request.headers))[0][1]
    users = app.data.driver.db['users']
    lookup = {'token': authToken}
    account = users.find_one(lookup)
    request.json["host"] = ObjectId(account["_id"])
