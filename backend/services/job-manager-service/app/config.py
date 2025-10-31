import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://host.docker.internal:27017/jobs")
    # MONGO_URI = "mongodb://localhost:27017/jobs"



class DevelopmentConfig(Config):
        DEBUG = True

class ProductionConfig(Config):
        DEBUG = False