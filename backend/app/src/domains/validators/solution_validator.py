from flask import abort, make_response, jsonify
from bson.objectid import ObjectId
from datetime import datetime

class SolutionValidator(object):

    def __init__(self, request, current_app):
        self.db = current_app.data.driver.db
        self.request = request

    def __call__(self):
        return self.validate_solution_request()

    def validate_solution_request(self):
        solution = self.request.json
        if solution is None:
            abort(make_response(jsonify(error="Solution cannot be null!"), 422))
            return False
        result = self.validate_solution(solution)
        return result

    def validate_solution(self, solution):
        game = self.db['games'].find_one({
            '_id': ObjectId(solution['game'])
        })
        if not game:
            return False
        result = True
        if 'availableUntil' in game:
            result = game['availableUntil'] >= datetime.utcnow()
        if result and 'availableFrom' in game:
            result = game['availableFrom'] <= datetime.utcnow()
        return result

    def get_existing(self, solution = None):
        if 'existing' in self.__dict__ and self.existing:
            return self.existing
        solution = solution if solution else self.request.json
        self.existing = self.db['solutions'].find_one({
            'game': ObjectId(solution['game'])
            , 'nickname': solution['nickname']    
        })
        return self.existing
