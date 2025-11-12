from flask import Flask,jsonify
from routes.question_routes import question_bp
from config import get_config
from utility.logger import setup_logger
from exceptions.error_handler import register_error_handlers

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    app.register_blueprint(question_bp,url_prefix="/api/v1/questions")
    register_error_handlers(app)
    app.config["PROPAGATE_EXCEPTIONS"] = False
    app.config["TRAP_HTTP_EXCEPTIONS"] = False


    return app


if __name__ == "__main__":
    app = create_app()
    logger.info(f"🚀 Starting {config.SERVICE_NAME} in {config.__class__.__name__}")
    app.run(host="0.0.0.0", port=5002, debug=config.DEBUG and False)

