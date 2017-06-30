import unittest

class InitTest(unittest.TestCase):
	def test_initialisation(self):
		import os.path, sys
		sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))

		import run
