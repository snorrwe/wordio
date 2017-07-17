from flask import current_app
from bson.objectid import ObjectId

db = current_app.data.driver.db

def remove_old_solutions(solution):
    db['solutions'].delete_many({
        'game': ObjectId(solution['game'])
        , 'nickname': solution['nickname']
        , '_updated': { '$le': solution['_updated']  }
    })

def on_post_new_solution(solutions):
    for solution in solutions:
        remove_old_solutions(solution)
