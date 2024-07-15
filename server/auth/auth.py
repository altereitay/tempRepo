from flask import Blueprint, request, jsonify
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


    
@auth_bp.post('/login')
def login():
    from database.models import Users

    data = request.get_json()
    password = data.get('password')
    email = data.get('email')

    if not password or not email:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        user = Users.query.filter_by(email=email).first()

        if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            userToken = create_access_token(identity=email)
            return jsonify({"userToken": userToken}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": "Internal server error"}), 500



@auth_bp.post('/register')
def register():
    from database.models import Citizen, Users, db
    data = request.get_json()

    email_exists = Citizen.query.filter_by(email=data.get('email')).first()
    phone_exists = Citizen.query.filter_by(phoneNum=data.get('phoneNumber')).first()
    id_exists = Citizen.query.filter_by(id=data.get('id')).first()

    if email_exists:
        return jsonify({"message": "Email already registered", "field": "email"}), 409,
    if phone_exists:
        return jsonify({"message": "Phone number already registered", "field": "phone"}), 409,
    if id_exists:
        return jsonify({"message": "ID already registered", "field": "id"}), 409,

    password = data.get('password')
    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(15))

    user_instance = Users(email=data.get('email'),
                          password=hashedPassword,
                          role="citizen")
    citizen_instance = Citizen(id=data.get('id'),
                               firstName=data.get('firstName'),
                               lastName=data.get('lastName'),
                               email=data.get('email'),
                               phoneNum=data.get('phoneNumber'),
                               address=data.get('address'),
                               password=hashedPassword)

    db.session.add(citizen_instance)
    db.session.add(user_instance)
    db.session.commit()
    return jsonify({"message": "Registration successful"}), 201

@auth_bp.get('/home')
@jwt_required()
def home(): 
    from database.models import Citizen
    current_user = get_jwt_identity()
    user = Citizen.query.filter_by(email=current_user).first()
    return jsonify(userName=user.firstName), 200

@auth_bp.get('/getUserData')
@jwt_required()
def getUserData():
    from database.models import Citizen
    current_user = get_jwt_identity()
    user = Citizen.query.filter_by(email=current_user).first()
    return jsonify(firstName=user.firstName,
                   lastName=user.lastName,
                   email=user.email,
                   phoneNumber=user.phoneNum,
                   address=user.address
                   ), 200 

@auth_bp.post('/editProfile')
@jwt_required()
def editProfile():
    from database.models import Citizen, Users, db
    current_user_email = get_jwt_identity()

    data = request.get_json()
    new_email = data.get('email')
    new_phoneNum = data.get('phoneNumber')
    new_password = data.get('newPassword')
    
    try:
        citizen = Citizen.query.filter_by(email=current_user_email).first() 
        user = Users.query.filter_by(email=current_user_email).first()

        if new_email != current_user_email:
            if Citizen.query.filter_by(email=new_email).first():
                return jsonify(message='Email is already in use'), 400

        if new_phoneNum != citizen.phoneNum:
            if Citizen.query.filter_by(phoneNum=new_phoneNum).first():
                return jsonify(message='Phone number is already in use'), 400

        citizen.firstName = data.get('firstName', citizen.firstName)
        citizen.lastName = data.get('lastName', citizen.lastName)
        citizen.email = new_email  
        citizen.phoneNum = new_phoneNum  
        citizen.address = data.get('address', citizen.address) 
        if new_password != "": 
            hashedPassword = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt(15))
            user.password = hashedPassword 
            citizen.password = hashedPassword

        user.email = new_email

        db.session.commit()

        userToken = create_access_token(identity=new_email)
        return jsonify(message="Profile updated successfully", token=userToken), 200

    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500