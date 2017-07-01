from ..domain_base import domain

@domain
class Users(object):
    name = "users"
    domain =  {
        'item_title': 'user'
        # the standard account entry point is defined as
        # '/accounts/<ObjectId>'. We define  an additional read-only entry
        # point accessible at '/accounts/<username>'.
        , 'additional_lookup': {
            'url': 'regex("[\w]+")',
            'field': 'username',
        },
        # We also disable endpoint caching as we don't want client apps to
        # cache account data.
        'cache_control': '',
        'cache_expires': 0

        , 'auth_field': 'username'

        # Allow 'token' to be returned with POST responses
        , 'extra_response_fields': ['token']

        , 'datasource': {
            'projection': { 
                'username': 1 
                , 'displayName': 1
            }
        }

        , 'schema': {
            'username': {
                'type': 'string'
                , 'unique': True
                , 'required': True
            }
            , 'password': {
                'type': 'string' 
                , 'required': True
            }
            , 'displayName': {
                'type': 'string'
                , 'required': True
            }
            , 'token': {
                'type': 'string'
                , 'unique': True
            }
        }
    }
