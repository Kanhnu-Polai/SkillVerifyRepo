import pika
import json
from .config import Config
from .email_service import send_email
import logging

logger = logging.getLogger(__name__)

def start_consumer():
    connection = pika.BlockingConnection(pika.URLParameters(Config.RABBITMQ_URL))
    channel = connection.channel()
    channel.queue_declare(queue='notification_queue', durable=True)

    def callback(ch, method, properties, body):
        try:
            data = json.loads(body)
            logger.info(f"Received message: {data}")
            action = data.get("type")
            email = data.get("email")

            if action == "REGISTER_OTP":
                content = f"<p>Your OTP is <b>{data.get('otp')}</b></p>"
                send_email(email, "Verify your OTP", content)

            elif action == "REGISTER_SUCCESS":
                content = f"<p>Welcome {data.get('name')} to SkillVerify!</p>"
                send_email(email, "Welcome to SkillVerify", content)

            elif action == "APPLIED_JOB":
                job = data.get("job")
                content = f"<p>You applied for <b>{job['title']}</b> at {job['company']}.</p>"
                send_email(email, "Job Application Submitted", content)

        except Exception as e:
            logger.error(f"Error in processing message: {e}")

    channel.basic_consume(queue='notification_queue', on_message_callback=callback, auto_ack=True)
    logger.info("Notification Consumer started...")
    channel.start_consuming()