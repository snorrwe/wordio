from eve.io.mongo import Validator

class IsFullBoardValidator(Validator):

    def validate_board(self, board):
        (lengths, mins, maxs) = self.get_length_by_board(board)
        board_2d = {}
        for tile in board:
            board_2d[(tile["x"], tile["y"])] = True
        for x in range(mins[0], maxs[0] + 1):
            if(not self._check_row(x, board_2d, range(mins[1], maxs[1] + 1))):
                return False
        return True

    def _check_row(self, x, board_2d, r):
        for y in r:
            if (x,y) not in board_2d:
                self._error("board", "Board must be a full n×m matrix!")
                return False
        return True

    def get_length_by_board(self, board):
        min = (board[0]["x"], board[0]["y"])
        max = (board[0]["x"], board[0]["y"])
        for tile in board[1:]:
            min = self._get_next_by_comparison(min, tile["x"], tile["y"], lambda x,y: x < y)
            max = self._get_next_by_comparison(max, tile["x"], tile["y"], lambda x,y: x > y)
        return ((max[0] - min[0] + 1, max[1] - min[1] + 1), min, max)

    def _get_next_by_comparison(self, current, x, y, comparator):
        return (x if comparator(x, current[0]) else current[0], y if comparator(x, current[1]) else current[1])
