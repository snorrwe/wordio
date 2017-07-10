from flask import current_app as app
from bson.objectid import ObjectId

class InsertTilesByGamesHook(object):
    def __init__(self, request, app):
        self.request = request
        self.app = app
        self.tilesCollection = self.app.data.driver.db['private_tiles']

    def execute(self):
        if 'board' not in self.request.json or not len(self.request.json['board']):
            return
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
