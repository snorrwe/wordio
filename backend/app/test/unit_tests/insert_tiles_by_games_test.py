import unittest
from unittest.mock import Mock, patch

import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir, os.pardir))

from ..help.any import Any
from src.domains.event_hooks.insert_tiles_by_games import InsertTilesByGamesHook


class InsertTilesByGamesHookTests(unittest.TestCase):
	
	def create_request(self):
		self.request = Any()
		self.request.json = {'board': [{'id': 3412}]}

	def create_app(self):
		self.app = Any()
		self.app.data = Any()
		self.app.data.driver = Any()
		self.app.data.driver.db = {
			'tiles': Any(find_one = lambda x: None, insert_one = lambda x: Any(inserted_id = 5))
		}

	def create_service(self, **kwargs):
		if 'request' in kwargs:
			self.request = kwargs['request']
		else:
			self.create_request()
		if 'app' in kwargs:
			self.app = kwargs['app']
		else:
			self.create_app()
		return InsertTilesByGamesHook(self.request, self.app)

	def test_can_create(self):
		self.create_service()		

	def test_no_board(self):
		request = Any()
		request.json = {}
		service = self.create_service(request = request)
		service.execute()
		assert "board" in request.json
		assert request.json["board"] is not None
		assert len(request.json["board"]) is 0	

	def test_empty_board(self):
		request = Any()
		request.json = {'board': []}
		service = self.create_service(request = request)
		service.execute()
		assert "board" in request.json
		assert request.json["board"] is not None
		assert len(request.json["board"]) is 0

	def test_without_existing(self):
		service = self.create_service()
		service.execute()
		assert "board" in self.request.json
		assert self.request.json["board"] is not None
		assert len(self.request.json["board"]) is 1
		assert self.request.json["board"][0] is 5

	def test_with_existing(self):
		request = Any()
		request.json = {'board': [{'id': 543}]}
		service = self.create_service(request = request)
		self.app.data.driver.db['tiles'].find_one = lambda x: { '_id': 123 }
		service.execute()
		assert "board" in request.json
		assert request.json["board"] is not None
		assert len(request.json["board"]) is 1
		assert request.json["board"][0] is 123

if __name__ == '__main__':
	unittest.main()
