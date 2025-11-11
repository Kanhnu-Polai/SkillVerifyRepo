from config.base_config import BaseConfig

class DockerConfig(BaseConfig):
    DEBUG = False
    LOG_LEVEL = "INFO"
    MONGO_URI = "mongodb://mongodb:27017/question_db_docker"  # Docker network alias