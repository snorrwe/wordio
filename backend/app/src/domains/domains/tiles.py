from ..domain_base import domain

@domain
class Tiles(object):
    name = "private_tiles"
    domain = {
        'item_title': 'private_tile'
        , 'cache_control': ''
        , 'cache_expires': 0
        , 'resource_methods': ['GET', 'POST', 'DELETE']
        , "item_methods": ['GET', 'PATCH', 'DELETE', 'PUT']
        , 'internal_resource': True

        , 'schema': {
            'x': {
                'type': 'integer'
                , 'required': True
            }
            , 'y': {
                'type': 'integer'
                , 'required': True
            }
            , 'value': {
                'type': 'string'
                , 'required': True
                , 'empty': False
            }
            , 'filled': {
                'type': 'boolean'
                , 'required': True
            }
        }
    }

@domain
class PublicTiles(object):
    name = "tiles"
    domain = {
        'item_title': 'tile'
        , 'cache_control': ''
        , 'cache_expires': 0

        , 'public_methods': ['GET']
        , 'public_item_methods': ['GET']

        , 'datasource': {
            'source': 'private_tiles'
            , 'projection': {
                "x": 1
                , "y": 1
                , "value": 1
            }
        }
    }
