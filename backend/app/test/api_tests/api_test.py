import requests
import sys
import pytest
from time import sleep

import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, os.path.pardir)))
import settings

MONGO_HOST = settings.MONGO_HOST
MONGO_PORT = settings.MONGO_PORT
MONGO_USERNAME = settings.MONGO_USERNAME
MONGO_PASSWORD = settings.MONGO_PASSWORD
MONGO_DBNAME = settings.MONGO_DBNAME

TEST_USER = {
    'username': 'test_user_352aaeb7fcf46d4494d0c9e4730aedea'
    , 'password': '0xdeadbeef'
    , 'displayName': 'DeadBeef' 
}

import login_tests
import register_tests
import games_tests
from stack_log_decorator import log_stack

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack("/hello test")
def test_hello(api_base_url):
    url = '%shello/' % api_base_url
    response = requests.get(url)
    result = response.json()
    assert result != None
    assert result['status']
    assert result['status'] == "up&running"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
def test_api(api_base_url = "http://127.0.0.1:5000/"):
    tries = 0
    try:
        while 1:
            try:
                tries += 1
                test_hello(api_base_url)
                register_tests.run_all()
                login_tests.run_all()
                games_tests.run_all()
                return 0
            except requests.exceptions.ConnectionError:
                if(tries > 5):
                    print("Number of max tries exceeded, giving up")
                    raise
                print("ConnectionError, retrying in 5 seconds")
                sleep(5)
    except:
        print('''
//////////////////////////////////
/////////////Failure//////////////
//////////////////////////////////
''')
        print('Api base url: %s' % api_base_url)
        print("\n//////////////////////////////////\n")
        raise

if __name__ == '__main__':
    try:
        api_base_url = sys.argv[1]
        test_api(api_base_url)
    except IndexError:
        test_api()
