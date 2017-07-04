from flask import current_app as app
import pymongo

def hello():
    result = None
    try:
        helloCollection = app.data.driver.db['_hello']
        lookup = {'foo': 'bar'}
        find = helloCollection.find_one(lookup)
        if(find):
            helloCollection.delete_one(lookup)
        else:
            helloCollection.insert_one(lookup)
        result = "up&running"
    except (pymongo.errors.AutoReconnect, pymongo.errors.ServerSelectionTimeoutError):
        result = "db_not_available!"
    return '''{
"status": "%s"         
}''' % result