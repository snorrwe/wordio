from ..domain_base import domain

@domain
class Games(object):
    name = "games"
    domain = {
        'item_title': 'game'
        , 'cache_control': ''
        , 'cache_expires': 0
        , 'public_methods': ['GET']
        , 'public_item_methods': ['GET']
        , 'resource_methods': ['GET', 'POST', 'DELETE']
        , "item_methods": ['GET', 'PATCH', 'DELETE', 'PUT']
        
        , 'auth_field': 'host'

        , 'datasource': {
            'projection': { 
                'host': 1
                , 'board': 1
            }
        }

        , 'schema': {
            'host': {
                'type': 'objectid'
                , 'data_relation': {
                    'resource': 'users'
                    , 'field': '_id'
                    , 'embeddable': True
                }
                , 'required': True
                , 'empty': False
            }

            , 'name': {
                'type': 'string'
                , 'required': True
                , 'empty': False
            }

            , 'availableFrom': {
                'type': 'datetime'
                , 'required': False
            }

            , 'availableUntil': {
                'type': 'datetime'
                , 'required': False
            }

            , 'board': {
                'type': 'list'
                , 'schema': {
                    'type': 'objectid'
                    , 'data_relation': {
                        'resource': 'tiles'
                        , 'field': '_id'
                        , 'embeddable': True
                    }
                }
                , 'required': True
            }
        }
    }
