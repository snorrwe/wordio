from flask import current_app as app
from flask import abort, make_response, jsonify
from bson.objectid import ObjectId

def insert_hosts_by_solutions(request):
    gameId = ObjectId(request.json['game'])
    if not gameId:
        abort(make_response(jsonify(missingKey=key), 400))
    game = app.data.driver.db['games'].find_one({"_id": gameId})
    if not game:
        abort(make_response(jsonify(error="No game by id [%s] found" % gameId), 400))
    host = app.data.driver.db['users'].find_one({"_id": game["host"]})
    request.json['host'] = host["_id"] if host else ""
