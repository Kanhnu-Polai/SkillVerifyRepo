import os

from dotenv import load_dotenv
from config.base_config import BaseConfig

load_dotenv(dotenv_path="envs/.env.docker")

class DockerConfig(BaseConfig):
    DEBUG = os.getenv("DEBUG")
    LOG_LEVEL = os.getenv("LOG_LEVEL")
    MONGO_URI = os.getenv("MONGO_URI")