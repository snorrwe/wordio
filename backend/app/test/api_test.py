import requests
import sys

def test_api(api_base_url = "http://127.0.0.1:5000"):
	try:
		url = '%s/hello' % api_base_url
		response = requests.get(url)
		result = response.json()
		assert result['status'] == "up&running"
		return 0
	except:
		print("Failure")
		raise

if __name__ == '__main__':
	try:
		api_base_url = sys.argv[1]
		test_api(api_base_url)
	except IndexError:
		test_api()
