from flask import current_app as app
from flask import abort, make_response, jsonify
from bson.objectid import ObjectId
from ..validators.is_full_board_validator import IsFullBoardValidator

class InsertTilesByGamesHook(object):
    def __init__(self, request, app):
        self.request = request
        self.app = app
        self.tilesCollection = self.app.data.driver.db['private_tiles']
        self.validator = IsFullBoardValidator()

    def execute(self):
        if 'board' not in self.request.json or not len(self.request.json['board']):
            self.request.json['board'] = []
            return
        if(self.validate_board()):
            self.process_tiles()
        else:
            abort(make_response(jsonify(error="Board is invalid"), 422))

    def validate_board(self):
        try:
            return self.validator.validate_board(self.request.json['board'])
        except KeyError as error:
            abort(make_response(jsonify(missingKey=error.args[0]), 422))
            return False

    def process_tiles(self):
        tile_ids = []
        for tile in self.request.json['board']:
            id = None
            existing = self.tilesCollection.find_one(tile)
            if(existing):
                id = existing['_id']
            else:
                result = self.tilesCollection.insert_one(tile)
                id = result.inserted_id
            if id:
                tile_ids.append(ObjectId(id))
        self.request.json['board'] = tile_ids
        
def insert_tiles_by_games(request):
    InsertTilesByGamesHook(request, app).execute()
