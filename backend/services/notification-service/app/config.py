import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
    EMAIL_SENDER = os.getenv("EMAIL_SENDER")
    RABBITMQ_URL = os.getenv("RABBITMQ_URL")

