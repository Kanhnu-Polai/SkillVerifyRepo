from flask import Flask,jsonify
from routes.question_routes import question_bp
from config import get_config
from utility.logger import setup_logger

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    app.register_blueprint(question_bp,url_prefix="/api/v1/questions")



    @app.route("/", methods=["GET"])
    def health_check():
        logger.info(f"✅ Health check for {config.SERVICE_NAME} ({config.__class__.__name__})")
        return jsonify({
            "service": config.SERVICE_NAME,
            "env": config.__class__.__name__,
            "mongo_uri": config.MONGO_URI,
            "status": "running ✅"
        }), 200

    return app


if __name__ == "__main__":
    app = create_app()
    logger.info(f"🚀 Starting {config.SERVICE_NAME} in {config.__class__.__name__}")
    app.run(host="0.0.0.0", port=5002, debug=config.DEBUG)

