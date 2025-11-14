from flask import jsonify , Blueprint,request
from utitlity.logger import setup_logger
from config import get_config

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)

question_service_bp =  Blueprint("question",__name__)

@question_service_bp.route("/prepare",methods=["POST"])
def prepare_question():
    prepare_info = request.get_json()
    logger.info("✅ Receive request to prepare question for examId: %s", prepare_info.get("examId"))
    return jsonify(
        {
            "prepared":True
        }
    )