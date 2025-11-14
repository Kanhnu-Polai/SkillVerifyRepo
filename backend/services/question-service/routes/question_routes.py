from flask import jsonify , Blueprint,request
from utitlity.logger import setup_logger
from config import get_config
from validation.prepare_question_req import PrepareRequest
from pydantic import ValidationError

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)

question_service_bp =  Blueprint("question",__name__)

@question_service_bp.route("/prepare",methods=["POST"])
def prepare_question():
    prepare_info = request.get_json()
    try:
        dto = PrepareRequest(**prepare_info)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400

    logger.info("✅ Receive request to prepare question for examId: %s", prepare_info.get("examId"))
    return jsonify(
        {
            "prepared":True
        }
    )