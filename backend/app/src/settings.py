# -*- coding: utf-8 -*-

from src.domains import domain_import

MONGO_HOST = None
MONGO_PORT = 27017
MONGO_USERNAME = 'wordio'
MONGO_PASSWORD = 'wordio_pw'
MONGO_DBNAME = 'wordio'

DATE_FORMAT: "%Y-%m-%dT%H:%M:%S.%fZ"

HATEOAS = True

# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
CACHE_CONTROL = 'max-age=20, must-revalidate'
CACHE_EXPIRES = 20

AUTH_FIELD = 'user_id'

EMBEDDING = True

# The DOMAIN dict explains which resources will be available and how they will
# be accessible to the API consumer.
DOMAIN = domain_import.get_domains()
