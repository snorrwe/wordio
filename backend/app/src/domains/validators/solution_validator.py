from flask import abort, make_response, jsonify
from bson.objectid import ObjectId

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
        return self.validate_solution(solution)

    def validate_solution(self, solution):
        existing = self.get_existing(solution)
        if existing:
            self.db['solutions'].delete_one(existing)
        return True

    def get_existing(self, solution = None):
        if 'existing' in self.__dict__ and self.existing:
            return self.existing
        solution = solution if solution else self.request.json
        self.existing = self.db['solutions'].find_one({
            'game': ObjectId(solution['game'])
            , 'nickname': solution['nickname']    
        })
        return self.existing
