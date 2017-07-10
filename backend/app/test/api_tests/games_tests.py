from api_test import TEST_USER as TEST_USER
from api_test import MONGO_HOST as MONGO_HOST
from api_test import MONGO_HOST as MONGO_HOST
from api_test import MONGO_PORT as MONGO_PORT

import sys, copy
import pytest, pymongo, requests
from stack_log_decorator import log_stack
from register_tests import test_register_valid

AUTHTOKEN = None

@log_stack()
def add_existing_test_user(api_base_url):
    AUTHTOKEN = test_register_valid(api_base_url)

@log_stack()
def delete_existing_test_user():
    client = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
    db = client['wordio']
    assert db
    lookup = {"username": TEST_USER["username"]}
    test = db["users"].find_one(lookup)
    if(test):
        db["users"].delete_one(lookup)

@log_stack()
def setup(api_base_url):
    add_existing_test_user(api_base_url)

@log_stack()
def teardown():
    delete_existing_test_user()

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack()
def test_availability(api_base_url):
    url = "%sgames/" % api_base_url
    response = requests.get(url, headers={ 
        "Content-Type": "application/json"
        , "Authorization": AUTHTOKEN 
    })
    assert response
    assert response.status_code is 200

@log_stack("games tests")
def run_all(api_base_url = "http://127.0.0.1:5000/"):
    try:
        setup(api_base_url)
        test_availability(api_base_url)
    finally:
        teardown()

if __name__ == '__main__':
    try:
        api_base_url = sys.argv[1]
        run_all(api_base_url)
    except IndexError:
        run_all()
