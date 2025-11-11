import os
from config.local_config import LocalConfig
from config.docker_config import DockerConfig

def get_config():
    env = os.getenv("FLASK_ENV","local").lower()
    if env=="docker":
        return DockerConfig
    else:
        return LocalConfig
