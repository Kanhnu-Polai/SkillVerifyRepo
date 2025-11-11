from datetime import datetime
from uuid import uuid4


def create_question_document(data):
    """
    Create a standardized question document for MongoDB.
    Includes validation, metadata normalization, and audit info.
    """

    # ✅ Basic validation
    if not data.get("questionText"):
        raise ValueError("❌ 'questionText' is required.")

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
            raise ValueError("❌ 'options' required for MCQ type questions.")
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