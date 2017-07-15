import unittest

import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir, os.pardir))

from src.domains.validators.is_full_board_validator import IsFullBoardValidator

class IsFullBoardValidator_test(unittest.TestCase):
    def test_init(self):
        validator = IsFullBoardValidator()
        assert validator is not None

    def test_get_length_by_board_1_by_1(self):
        board = [{"x": 0, "y": 0}]
        validator = IsFullBoardValidator()
        result = validator.get_length_by_board(board)
        assert result is not None
        assert result[0][0] is 1
        assert result[0][1] is 1
        assert result[1][0] is 0
        assert result[1][1] is 0
        assert result[2][0] is 0
        assert result[2][1] is 0

    def test_get_length_by_board_2_by_2(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 1, "y": 0}
            , {"x": 0, "y": 1}
            , {"x": 1, "y": 1}
        ]
        validator = IsFullBoardValidator()
        result = validator.get_length_by_board(board)
        assert result[0] is not None
        assert result[0][0] is 2
        assert result[0][1] is 2
        assert result[1][0] is 0
        assert result[1][1] is 0
        assert result[2][0] is 1
        assert result[2][1] is 1

    def test_get_length_by_board_3_by_3(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 2, "y": 2}
        ]
        validator = IsFullBoardValidator()
        result = validator.get_length_by_board(board)
        assert result[0] is not None
        assert result[0][0] is 3
        assert result[0][1] is 3
        assert result[2][0] is 2
        assert result[2][1] is 2

    def test_get_length_by_board_2_by_3(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 1, "y": 2}
        ]
        validator = IsFullBoardValidator()
        result = validator.get_length_by_board(board)
        assert result[0] is not None
        assert result[0][0] is 2
        assert result[0][1] is 3
        assert result[2][0] is 1
        assert result[2][1] is 2

    def test_validate_board_invalid_2_by_3(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 1, "y": 2}
        ]
        validator = IsFullBoardValidator()
        result = validator.validate_board(board)
        assert result is False

    def test_validate_board_1_by_1(self):
        board = [
            {"x": 0, "y": 0}
        ]
        validator = IsFullBoardValidator()
        result = validator.validate_board(board)
        assert result is True

    def test_validate_board_2_by_1(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 1, "y": 0}
        ]
        validator = IsFullBoardValidator()
        result = validator.validate_board(board)
        assert result is True

    def test_validate_board_2_by_2(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 1, "y": 0}
            , {"x": 0, "y": 1}
            , {"x": 1, "y": 1}
        ]
        validator = IsFullBoardValidator()
        result = validator.validate_board(board)
        assert result is True

    def test_validate_board_2_by_2_missing_1(self):
        board = [
            {"x": 0, "y": 0}
            , {"x": 1, "y": 0}
            , {"x": 1, "y": 1}
        ]
        validator = IsFullBoardValidator()
        result = validator.validate_board(board)
        assert result is False

    def test_validate_board_doesnt_start_at_0(self):
        board = [
            {"x": 0, "y": 5}
            , {"x": 0, "y": 6}
        ]
        validator = IsFullBoardValidator()
        result = validator.validate_board(board)
        assert result is True

if __name__ == '__main__':
    unittest.main()
