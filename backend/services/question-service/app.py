from flask import Flask,jsonify
from config import get_config
from utitlity.logger import setup_logger
from routes.question_routes import question_service_bp

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)


    app.register_blueprint(question_service_bp,url_prefix="/api/v1/questions")
    return app

if __name__ == "__main__":
    app = create_app()
    logger.info(f"🚀 Starting {config.SERVICE_NAME} in {config.__class__.__name__}")
    HOST = "0.0.0.0"
    PORT = 5003
    PREFIX = "/api/v1/questions"

    base_url = f"http://{HOST}:{PORT}{PREFIX}"
    logger.info("Base URL: %s", base_url)

    app.run(host=HOST, port=PORT, debug=config.DEBUG and False)