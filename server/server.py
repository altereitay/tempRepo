from flask import Flask, request, jsonify 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import insert
app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://CBP:CBP!234@eitayalter.ddns.net/CBP"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Users(db.Model): 
    __tablename__ = 'Users'
    email = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100), nullable=False)


class Citizen(db.Model):
    __tablename__ = 'Citizen'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phoneNum = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(200), nullable=True)
    userName = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    token = db.Column(db.String(100), nullable=True)

class Technician(db.Model):
    __tablename__ = 'Technician'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phoneNum = db.Column(db.String(20), unique=True, nullable=False)
    userName = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    token = db.Column(db.String(100), nullable=True)

class Dispatcher(db.Model):
    __tablename__ = 'Dispatcher'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phoneNum = db.Column(db.String(20), unique=True, nullable=False)
    userName = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    token = db.Column(db.String(100), nullable=True)

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
    app.run(debug=True)