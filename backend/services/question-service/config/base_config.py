import os

class BaseConfig:
    SERVICE_NAME = "question-service"
    DEBUG = True
    TESTING = False
    LOG_LEVEL = "INFO"


    # default database setting (MangoDb)
    MONGO_URI = os.getenv("MONGO_URI","mongodb://localhost:27017/exam_question_db")
    DB_NAME = os.getenv("DB_NAME", "exam_question_db")
    COLLECTION_NAME = os.getenv("COLLECTION_NAME", "exam_questions")

    #Log file
    LOG_FILE = os.getenv("LOG_FILE", "logs/app.log")

