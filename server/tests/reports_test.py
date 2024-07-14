from server import app


def test_get_user_by_reporter():
    response = app.test_client().get('/report/reporter/1')
    assert response.status_code == 200
    assert response.json['data'] == 'No Reports Found'
