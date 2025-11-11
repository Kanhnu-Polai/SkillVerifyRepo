import os
class BaseConfig:
    SERVICE_NAME = "question-generator-service"
    DEBUG= True
    TESTING = False
    LOG_LEVEL = "INFO"

    # Default mango setting
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/question_db")
    DB_NAME = os.getenv("DB_NAME", "question_db")
    COLLECTION_NAME = os.getenv("COLLECTION_NAME", "questions")

    LOG_FILE = os.getenv("LOG_FILE", "logs/app.log")