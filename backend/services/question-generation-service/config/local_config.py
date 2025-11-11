from config.base_config import BaseConfig


class LocalConfig(BaseConfig):
    DEBUG = True
    LOG_LEVEL = "DEBUG"
    MONGO_URI = "mongodb://localhost:27017/question_db_local"

