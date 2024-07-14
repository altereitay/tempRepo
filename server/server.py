import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from database.models import db
from report.reports import reports_bp
from auth.auth import auth_bp


from flask_jwt_extended import JWTManager

load_dotenv()
app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')  
jwt = JWTManager(app)
CORS(app)

app.config[
    "SQLALCHEMY_DATABASE_URI"] = (f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}"
                                  f"@{os.getenv('MYSQL_URL')}/{os.getenv('MYSQL_DB')}")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(reports_bp)
app.register_blueprint(auth_bp)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
