import requests
import sys
import asyncio

async def test_api():
	try:
		url = 'http://127.0.0.1:5000/hello'
		response = requests.get(url)
		result = response.json()
		assert result['status'] == "up&running"
		return 0
	except:
		print("Failure")
		raise

if __name__ == '__main__':
	loop = asyncio.get_event_loop()
	loop.run_until_complete(test_api())
	loop.close()
