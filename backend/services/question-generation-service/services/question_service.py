from pymongo import MongoClient
from config import get_config
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

