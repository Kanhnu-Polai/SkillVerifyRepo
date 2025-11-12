from datetime import datetime
from uuid import uuid4

from utility.logger import setup_logger
from config.local_config import BaseConfig


from exceptions.exception_classes import OptionNotFoundException, QuestionTestNotFoundException

logger = setup_logger(service_name=BaseConfig.SERVICE_NAME,log_level=BaseConfig.LOG_LEVEL)
def create_question_document(data):
    """
    Create a standardized question document for MongoDB.
    Includes validation, metadata normalization, and audit info.
    """

    # ✅ Basic validation
    logger.info("🟡 Validating required fields before saving in db....")
    if not data.get("questionText"):
        logger.warning("❌ Validation failed as question test filed empty...")
        raise QuestionTestNotFoundException()

    question_type = data.get("questionType", "MCQ").upper()
    if question_type not in ["MCQ", "CODING", "YES_NO", "DESCRIPTIVE"]:
        raise ValueError(f"❌ Invalid questionType '{question_type}'. Allowed: MCQ, CODING, YES_NO, DESCRIPTIVE")

    # ✅ Handle coding-specific data
    attachments = {}
    if question_type == "CODING":
        attachments["codeSnippet"] = data.get("attachments", {}).get("codeSnippet")
        attachments["referenceLinks"] = data.get("attachments", {}).get("referenceLinks", [])
        attachments["imageUrl"] = None  # typically not needed for coding

    elif question_type == "MCQ":
        if not data.get("options"):
            logger.warning("❌ Validation failed as options not provided for MCQ questions...")
            raise OptionNotFoundException()
        attachments["imageUrl"] = data.get("attachments", {}).get("imageUrl")
        attachments["referenceLinks"] = data.get("attachments", {}).get("referenceLinks", [])

    # ✅ Construct document
    doc = {
        "_id": str(uuid4()),  # Unique ID for each question
        "questionText": data.get("questionText"),
        "questionType": question_type,
        "options": data.get("options", []),
        "correctAnswer": data.get("correctAnswer"),
        "metadata": {
            "topic": data.get("metadata", {}).get("topic"),
            "subTopic": data.get("metadata", {}).get("subTopic"),
            "difficulty": data.get("metadata", {}).get("difficulty", "medium"),
            "jobRole": data.get("metadata", {}).get("jobRole"),
            "skills": data.get("metadata", {}).get("skills", []),
            "tags": data.get("metadata", {}).get("tags", []),
            "aiInsights": data.get("metadata", {}).get("aiInsights", {
                "clarityScore": None,
                "relevanceScore": None,
                "discriminationPower": None,
            }),
            "jobContext": data.get("metadata", {}).get("jobContext", {
                "jobId": None,
                "industry": None,
                "region": None
            }),
        },
        "attachments": attachments,
        "audit": {
            "createdBy": data.get("audit", {}).get("createdBy", "system_auto"),
            "createdAt": datetime.utcnow(),
            "updatedBy": data.get("audit", {}).get("updatedBy"),
            "updatedAt": datetime.utcnow(),
            "approvedBy": data.get("audit", {}).get("approvedBy"),
            "approvalDate": data.get("audit", {}).get("approvalDate"),
        }
    }

    return doc