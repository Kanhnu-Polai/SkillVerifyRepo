from pymongo import MongoClient
from config import get_config
from exceptions.exception_classes import InternalServerError
from models.question_model import create_question_document
from utility.logger import setup_logger



config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME,log_level=config.LOG_LEVEL)
client = MongoClient(config.MONGO_URI)
db = client[config.DB_NAME]
collection = db[config.COLLECTION_NAME]


def add_question(data):
        logger.info("✅ Inside add question service ... ")
        doc = create_question_document(data)
        collection.insert_one(doc)
        logger.info(f"✅ Added question | ID: {doc['_id']}")
        return  {"message": "Question added successfully", "id": doc["_id"]}

from utility.logger import setup_logger
from config import get_config

config = get_config()
logger = setup_logger(service_name=config.SERVICE_NAME, log_level=config.LOG_LEVEL)

def get_filtered_questions(filter_info):

    logger.info("✅ Received request to fetch filtered questions")

    job_role = filter_info.get("jobRole")
    skills = filter_info.get("skills", [])
    tags = filter_info.get("tags", [])
    topics = filter_info.get("topics", [])
    limit = filter_info.get("limit", 10)

    logger.debug(f"🔎 Filter Info => jobRole={job_role}, skills={skills}, tags={tags}, topics={topics}, limit={limit}")

    try:
        # STEP-1 — Fetch as broad as possible using OR condition
        mongo_filter = {
            "$or": [
                {"metadata.jobRole": job_role},
                {"metadata.skills": {"$in": skills}},
                {"metadata.tags": {"$in": tags}},
                {"metadata.topic": {"$in": topics}}
            ]
        }

        logger.debug(f"✅ Mongo filter generated: {mongo_filter}")

        raw_questions = list(collection.find(mongo_filter))
        logger.info(f"✅ Retrieved {len(raw_questions)} raw questions from MongoDB")

        # STEP-2 — Apply scoring logic
        scored_questions = []
        for q in raw_questions:
            score = 0
            metadata = q.get("metadata", {})

            # Job Role match
            if metadata.get("jobRole") == job_role:
                score += 40

            # Skills match
            q_skills = metadata.get("skills", [])
            matched_skills = set(q_skills) & set(skills)
            score += len(matched_skills) * 30

            # Topic match
            q_topic = metadata.get("topic")
            if q_topic in topics:
                score += 20

            # Tags match
            q_tags = metadata.get("tags", [])
            matched_tags = set(q_tags) & set(tags)
            score += len(matched_tags) * 10

            logger.debug(
                f"✅ Question ID={q.get('_id')} | "
                f"jobRoleMatch={metadata.get('jobRole') == job_role}, "
                f"skillsMatched={list(matched_skills)}, "
                f"topicMatch={q_topic in topics}, "
                f"tagsMatched={list(matched_tags)}, "
                f"totalScore={score}"
            )

            scored_questions.append((score, q))

        # STEP-3 — Sort by descending score
        scored_questions.sort(key=lambda x: x[0], reverse=True)
        logger.info("✅ Sorted questions based on relevance score")

        # STEP-4 — Pick top N (only positive scoring)
        final_questions = [q for score, q in scored_questions if score > 0][:limit]
        logger.info(f"✅ Returning top {len(final_questions)} questions (limit={limit})")
        if len(final_questions) < limit:
            remainingQuestions = limit-len(final_questions)
            # call to ai-question-generation-service by providing the job details to send the remaining questions

        return final_questions

    except Exception as e:
        logger.exception("💥 Failed to filter questions due to unexpected error")
        raise InternalServerError("Failed to filter questions due to unexpected error")



