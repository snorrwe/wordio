from flask import current_app as app

class InsertTilesByGamesHook(object):
    def __init__(self, request, app):
        self.request = request
        self.app = app
        self.tilesCollection = self.app.data.driver.db['tiles']

    def execute(self):
        tiles = self.request.json['board'] if 'board' in self.request.json else []
        new_tiles = []
        for tile in tiles:
            id = None
            existing = self.tilesCollection.find_one(tile)
            if(existing):
                id = existing['_id']
            else:
                result = self.tilesCollection.insert_one(tile)
                id = result.inserted_id
            new_tiles.append(id)
        self.request.json['board'] = new_tiles
        
def insert_tiles_by_games(request):
    InsertTilesByGamesHook(request, current_app).execute()