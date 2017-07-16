from ..domain_base import domain

@domain
class Solutions(object):
    name = "solutions"
    domain = {
        'item_title': 'solution'
        , 'cache_control': ''
        , 'cache_expires': 0

        , 'public_methods': ['POST']
        , 'public_item_methods': ['PUT']
        , 'resource_methods': ['GET', 'POST', 'DELETE']
        , 'item_methods': ['GET', 'PATCH', 'DELETE', 'PUT']
        
        , 'auth_field': 'host'

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

            , 'game': {
                'type': 'objectid'
                , 'data_relation': {
                    'resource': 'games'
                    , 'field': '_id'
                    , 'embeddable': True
                }
                , 'required': True
                , 'empty': False
            }

            , 'nickname': {
                'type': 'string'
                , 'required': True
                , 'empty': False
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
