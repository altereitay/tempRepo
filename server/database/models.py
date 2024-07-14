import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#TODO: remove password from everything that is not user
#TODO: add id to Users
#TODO: add email to techs and dispatchers

class Users(db.Model):
    __tablename__ = 'Users'
    email = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(10), nullable=False)


class Citizen(db.Model):
    __tablename__ = 'Citizen'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phoneNum = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(200), nullable=True)
    password = db.Column(db.String(100), nullable=False)


class Technician(db.Model):
    __tablename__ = 'Technician'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    phoneNum = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Dispatcher(db.Model):
    __tablename__ = 'Dispatcher'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    phoneNum = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Report(db.Model):
    __tablename__ = 'Reports'
    reportId = db.Column(db.String(100), primary_key=True)
    reporter = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    data = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=True)
    reportedAt = db.Column(db.DateTime(), default=datetime.datetime.now())
    isFixed = db.Column(db.Boolean, default=False)
    lastUpdate = db.Column(db.DateTime(), nullable=True)
    tech = db.Column(db.Integer, db.ForeignKey(Technician.id), nullable=True)
    techData = db.Column(db.String(100), nullable=True)
    disp = db.Column(db.Integer, db.ForeignKey(Dispatcher.id), nullable=True)
    dispData = db.Column(db.String(100), nullable=True)
