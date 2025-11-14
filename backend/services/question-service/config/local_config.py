import os

from config.base_config import BaseConfig
from dotenv import load_dotenv

#Loads specific env file
load_dotenv(dotenv_path="envs/env.local")

class LocalConfig(BaseConfig):
    DEBUG = os.getenv("DEBUG")
    LOG_LEVEL =  os.getenv("LOG_LEVEL")
    MONGO_URI = os.getenv("MONGO_URI")


