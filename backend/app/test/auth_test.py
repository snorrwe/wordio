import unittest
from unittest.mock import Mock

import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))

from src.auth.auth import WordioTokenAuth

class AuthTests(unittest.TestCase):

	def test_check_auth_by_id(self):
		roles = ['1']
		mock_auth = Mock(return_value=True)
		auth = WordioTokenAuth(mock_auth)
		user = { "_id": 123 }
		self.assertIsNotNone(auth.check_user_token("sometoken", roles, "somesrc", "GET", user))
		mock_auth.set_request_auth_value.assert_called_once_with(123)

	def test_check_auth_by_name(self):
		roles = ['1']
		mock_auth = Mock(return_value=True)
		auth = WordioTokenAuth(mock_auth)
		user = { "_id": 123, "username": "some_name" }
		self.assertIsNotNone(auth.check_user_token("sometoken", roles, "users", "GET", user))
		mock_auth.set_request_auth_value.assert_called_once_with("some_name")

if __name__ == '__main__':
	unittest.main()
