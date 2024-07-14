from flask import Blueprint, request, jsonify
import bcrypt

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
            return jsonify({"message": "Login successful"}), 200
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