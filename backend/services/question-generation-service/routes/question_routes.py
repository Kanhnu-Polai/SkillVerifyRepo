from flask import Blueprint , jsonify,request
from services.question_service import add_question , get_filtered_questions
from utility.logger import setup_logger
from config import get_config

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)
question_bp = Blueprint("question",__name__)

@question_bp.route("/add",methods=["POST"])
def handle_add_question():
        data = request.get_json()
        logger.info("✅ Received request to add the question :: %s",data.get("questionText"))
        result = add_question(data)
        return jsonify(result),201

@question_bp.route("/get_questions",methods = ["POST"])
def get_questions():
        filter_info = request.get_json()
        logger.info("✅ Getting a request to find questions for job role : %s ",filter_info.get("jobRole"))
        questions = get_filtered_questions(filter_info)

        return jsonify(questions),200


