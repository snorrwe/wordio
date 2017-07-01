# -*- coding: utf-8 -*-

import os
from src.domains import main

MONGO_USERNAME = ''
MONGO_PASSWORD = ''
MONGO_DBNAME = ''

# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

AUTH_FIELD = 'user_id'

# The DOMAIN dict explains which resources will be available and how they will
# be accessible to the API consumer.
DOMAIN = main.get_domain()
