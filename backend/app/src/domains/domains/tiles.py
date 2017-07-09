from ..domain_base import domain

@domain
class Tiles(object):
    name = "private_tiles"
    domain = {
        'item_title': 'private_tile'
        # We also disable endpoint caching as we don't want client apps to
        # cache account data.
        , 'cache_control': ''
        , 'cache_expires': 0

        , 'internal_resource': True
        , 'auth_field': 'host'

        , 'datasource': {
            'projection': {
                'x' : 1
                , 'y' : 1
                , 'value' : 1
            }
        }

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
        # We also disable endpoint caching as we don't want client apps to
        # cache account data.
        , 'cache_control': ''
        , 'cache_expires': 0

        , 'public_methods': ['GET']
        , 'public_item_methods': ['GET']

        , 'datasource': {
            'source': 'private_tiles'
            , 'projection': {
                'filled': 0
            }
        }
    }
