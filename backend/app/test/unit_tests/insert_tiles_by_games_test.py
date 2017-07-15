import unittest
from unittest.mock import Mock, patch
from bson import ObjectId

import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir, os.pardir))

from ..help.any import Any
from src.domains.event_hooks.insert_tiles_by_games import InsertTilesByGamesHook

class InsertTilesByGamesHookTests(unittest.TestCase):
	
	def create_request(self):
		self.request = Any()
		self.request.json = {'board': [{'_id': "3412", 'x': 0, 'y': 0}]}

	def create_app(self):
		self.app = Any()
		self.app.data = Any()
		self.app.data.driver = Any()
		self.app.data.driver.db = {
			'private_tiles': Any(find_one = lambda x: None, insert_one = lambda x: Any(inserted_id = ObjectId("59640453a3537b1b2c466f69")))
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
		assert self.request.json["board"][0].binary == ObjectId("59640453a3537b1b2c466f69").binary

	def test_with_existing(self):
		request = Any()
		request.json = {'board': [{'id': 543, 'x': 0, 'y': 0}]}
		service = self.create_service(request = request)
		self.app.data.driver.db['private_tiles'].find_one = lambda x: { '_id': "59640453a3537b1b2c46beef" }
		service.execute()
		assert "board" in request.json
		assert request.json["board"] is not None
		assert len(request.json["board"]) is 1
		assert request.json["board"][0].binary == ObjectId("59640453a3537b1b2c46beef").binary

if __name__ == '__main__':
	unittest.main()
