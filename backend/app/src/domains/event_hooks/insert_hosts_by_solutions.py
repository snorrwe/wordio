from flask import current_app as app
from flask import abort, make_response, jsonify
from bson.objectid import ObjectId

def insert_hosts_by_solutions(request):
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
	result = ObjectId(request.json[key])
	if not result:
		abort(make_response(jsonify(missingKey=key), 400))
	return result
