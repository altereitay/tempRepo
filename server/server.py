from flask import Flask, request, jsonify 
from flask_cors import CORS
from database.models import Users, Citizen, Dispatcher, Technician, db
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://CBP:CBP!234@eitayalter.ddns.net/CBP"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.get('/users')
def get_users():
    users = Users.query.all()
    return jsonify([{'password': user.password, 'email': user.email} for user in users])

@app.post('/login')
def test(): 
    data = request.get_json()
    user = None
    try: 
        user = Users.query.filter_by(email=data.get('email'), password=data.get('password')).first()
        if user is not None: 
            print("ok")
        else: 
            print("very not ok")
    except:
        print("not ok")
    
    return jsonify({'email':user.email, 'password':user.password})



if __name__ == "__main__": 
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')