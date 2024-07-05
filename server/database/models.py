from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from server import getDB

db = getDB()


class User(db.Model): 
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


