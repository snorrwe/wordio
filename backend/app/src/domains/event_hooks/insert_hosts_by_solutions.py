from flask import current_app as app
from flask import abort, make_response, jsonify
from bson.objectid import ObjectId
from bson.errors import InvalidId

def insert_hosts_by_solutions(request):
    if not request.json:
        abort(make_response(jsonify(error="Body cannot be empty"), 400))
        return
    gameId = get_object_id_by_request(request, "game")
    game = find_by_id("games", gameId)
    host = app.data.driver.db['users'].find_one({"_id": game["host"]})
    request.json['host'] = host["_id"] if host else ""

def find_by_id(collection, id):
    result = app.data.driver.db['games'].find_one({"_id": id})
    if not result:
        abort(make_response(jsonify(error="No item found in collection [%]s by id [%s]" % (collection,id)), 400))
    return result

def get_object_id_by_request(request, key):
    try:
        return ObjectId(request.json[key])
    except InvalidId:
        abort(make_response(jsonify(error="key=[%s] is not a valid ObjectId" % key), 400))
    except KeyError:
        abort(make_response(jsonify(missingKey=key), 400))
