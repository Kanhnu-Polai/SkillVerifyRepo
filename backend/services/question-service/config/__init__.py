from config.local_config import LocalConfig
from config.docker_config import DockerConfig
from dotenv import load_dotenv
import os
load_dotenv()

def get_config():
    env = os.getenv("FLASK_ENV","local").lower()

    if env == "docker":
        return DockerConfig
    elif env == "prod":
        return None
    else:
        return LocalConfig



