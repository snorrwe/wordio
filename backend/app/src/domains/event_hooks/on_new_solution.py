from flask import abort, make_response, jsonify, current_app
from .insert_tiles_by_games import insert_tiles_by_games
from .insert_hosts_by_solutions import insert_hosts_by_solutions
from ..validators.solution_validator import SolutionValidator

def on_new_solution(request):
    validator = SolutionValidator(request, current_app)
    existing = validator.get_existing()
    if(not validator()):
        abort(make_response(jsonify(error="Solution is not valid"), 422))
        return
    try:
        insert_hosts_by_solutions(request)
        insert_tiles_by_games(request)
    except:
        if existing:
            current_app.data.driver.db['solutions'].insert_one(existing)
        raise
