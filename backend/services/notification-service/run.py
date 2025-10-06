import os
import logging
from flask import Flask
from app.routes import routes
from app.consumer import start_consumer
from threading import Thread

# Create logs directory if not exist
os.makedirs('logs', exist_ok=True)

# Initialize Flask app
app = Flask(__name__)
app.register_blueprint(routes)

# Setup logging to both file and console
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    handlers=[
        logging.FileHandler('logs/notification.log'),
        logging.StreamHandler()
    ]
)

# Background Kafka/RabbitMQ consumer thread
def run_consumer():
    t = Thread(target=start_consumer)
    t.daemon = True
    t.start()

# Any startup logic you want can be added here
def startup_tasks():
    print("✅ Running startup tasks...")
    logging.info("✅ Notification service is starting up...")
    # You can add DB checks, send boot emails, etc.

if __name__ == "__main__":
    startup_tasks()
    run_consumer()
    app.run(debug=True, host="0.0.0.0", port=5003)