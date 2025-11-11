from flask import Blueprint , jsonify,request
from services.question_service import add_question
from utility.logger import setup_logger
from config import get_config

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)
question_bp = Blueprint("question",__name__)

@question_bp.route("/add",methods=["POST"])
def handle_add_question():
    try:
        data = request.get_json()
        result = add_question(data)
        return jsonify(result),201
    except Exception as e:
        logger.exception("❌ Failed to add question")
        return jsonify({"error": "Internal Server Error"}), 500
