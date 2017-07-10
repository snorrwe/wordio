from api_test import TEST_USER as TEST_USER
from api_test import MONGO_HOST as MONGO_HOST
from api_test import MONGO_HOST as MONGO_HOST
from api_test import MONGO_PORT as MONGO_PORT

import sys
import pytest, pymongo, requests
from stack_log_decorator import log_stack
def delete_existing_test_user():
    client = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
    db = client['wordio']
    assert db
    lookup = {"username": TEST_USER["username"]}
    test = db["users"].find_one(lookup)
    if(test):
        db["users"].delete_one(lookup)

@log_stack()
def setup():
    delete_existing_test_user()

@log_stack()
def teardown():
    delete_existing_test_user()

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack()
def test_register_empty(api_base_url):
    url = "%sregister/" % api_base_url
    payload = {}
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'missingKey' in response.json()
    assert response.json()['missingKey'] == "'username'"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack()
def test_register_no_pw(api_base_url):
    url = "%sregister/" % api_base_url
    payload = {'username': TEST_USER['username']}
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'missingKey' in response.json()
    assert response.json()['missingKey'] == "'password'"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack()
def test_register_no_displayName(api_base_url):
    url = "%sregister/" % api_base_url
    payload = {'username': TEST_USER['username'], 'password': TEST_USER['password']}
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'missingKey' in response.json()
    assert response.json()['missingKey'] == "'displayName'"

@pytest.mark.skip(reason="This is an explicit test for testing if the deployment succeeded. Run manually!")
@log_stack()
def test_register_valid(api_base_url):
    url = "%sregister/" % api_base_url
    payload = TEST_USER
    response = requests.post(url, json=payload, headers={ "Content-Type": "application/json" })
    assert response != None
    assert response.json()
    assert 'authToken' in response.json()
    return response.json()['authToken']

@log_stack("register tests")
def run_all(api_base_url = "http://127.0.0.1:5000/"):
    try:
        setup()
        test_register_empty(api_base_url)
        test_register_no_pw(api_base_url)
        test_register_no_displayName(api_base_url)
        test_register_valid(api_base_url)
    finally:
        teardown()

if __name__ == '__main__':
    try:
        api_base_url = sys.argv[1]
        run_all(api_base_url)
    except IndexError:
        run_all()