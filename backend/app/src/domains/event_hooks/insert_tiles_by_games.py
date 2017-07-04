from flask import current_app as app

def insert_tiles_by_games(request):
    tiles = request.json['board']
    new_tiles = []
    tilesCollection = app.data.driver.db['tiles']
    for tile in tiles:
        id = None
        existing = tilesCollection.find_one(tile)
        if(existing):
            id = existing['_id']
        else:
            result = tilesCollection.insert_one(tile)
            id = result.inserted_id
        new_tiles.append(id)
    request.json['board'] = new_tiles