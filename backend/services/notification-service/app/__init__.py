from flask import Flask
def create_app():
    app = Flask(__name__)
    from app.routes import email_bp
    app.register_blueprint(email_bp)
    return app