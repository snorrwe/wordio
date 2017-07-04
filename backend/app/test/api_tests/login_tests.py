from api_test import TEST_USER as TEST_USER
from api_test import MONGO_HOST as MONGO_HOST
from api_test import MONGO_HOST as MONGO_HOST
from api_test import MONGO_PORT as MONGO_PORT

import sys, copy
import pytest, pymongo, requests
from stack_log_decorator import log_stack
from register_tests import test_register_valid

@log_stack("add_existing_test_user")
def add_existing_test_user(api_base_url):
    test_register_valid(api_base_url)

@log_stack("delete_existing_test_user")
def delete_existing_test_user():
    client = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
    db = client['wordio']
    assert db
    lookup = {"username": TEST_USER["username"]}
    test = db["users"].find_one(lookup)
    if(test):
        db["users"].delete_one(lookup)

@log_stack("Setup")
def setup(api_base_url):
    add_existing_test_user(api_base_url)

@log_stack("Teardown")
def teardown():
    delete_existing_test_user()

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack("# /login valid test")
def test_login_valid(api_base_url):
    url = "%slogin/" % api_base_url
    payload = TEST_USER
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'authToken' in response.json()

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack("# /login wrong password test")
def test_login_wrong_password(api_base_url):
    url = "%slogin/" % api_base_url
    payload = copy.deepcopy(TEST_USER)
    payload['password'] = 'Oh, Kanga'
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'error' in response.json()
    assert response.json()['error'] == "Invalid credentials"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack("# /login wrong username test")
def test_login_wrong_username(api_base_url):
    url = "%slogin/" % api_base_url
    payload = copy.deepcopy(TEST_USER)
    payload['username'] = 'Oh, Kanga'
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'error' in response.json()
    assert response.json()['error'] == "Invalid credentials"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack("# /login missing password test")
def test_login_missing_password(api_base_url):
    url = "%slogin/" % api_base_url
    payload = copy.deepcopy(TEST_USER)
    del payload['password']
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'missingKey' in response.json()
    assert response.json()['missingKey'] == "'password'"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack("# /login missing username test")
def test_login_missing_username(api_base_url):
    url = "%slogin/" % api_base_url
    payload = copy.deepcopy(TEST_USER)
    del payload['username']
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'missingKey' in response.json()
    assert response.json()['missingKey'] == "'username'"

@log_stack("login tests")
def run_all(api_base_url = "http://127.0.0.1:5000/"):
    try:
        setup(api_base_url)
        test_login_valid(api_base_url)
        test_login_wrong_password(api_base_url)
        test_login_wrong_username(api_base_url)
        test_login_missing_password(api_base_url)
        test_login_missing_username(api_base_url)
    finally:
        teardown()

if __name__ == '__main__':
    try:
        api_base_url = sys.argv[1]
        run_all(api_base_url)
    except IndexError:
        run_all()
