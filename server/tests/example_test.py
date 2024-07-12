from server import app

def test_get_users():
    response = app.test_client().get('/users')
    assert response.status_code == 200