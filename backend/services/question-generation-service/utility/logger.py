import logging
import sys
import os
from logging.handlers import RotatingFileHandler

def setup_logger(service_name="question-generator", log_level="INFO", log_file="logs/app.log"):
    os.makedirs(os.path.dirname(log_file), exist_ok=True)

    logger = logging.getLogger(service_name)
    logger.setLevel(log_level.upper())

    if logger.handlers:
        return logger

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    console_handler.setLevel(log_level.upper())

    # Rotating file handler
    file_handler = RotatingFileHandler(log_file, maxBytes=5_000_000, backupCount=5)
    file_handler.setFormatter(formatter)
    file_handler.setLevel(log_level.upper())

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    # Reduce noise from Flask/PyMongo internals
    logging.getLogger("werkzeug").setLevel(logging.WARNING)
    logging.getLogger("pymongo").setLevel(logging.WARNING)

    logger.info(f"🪵 Logger initialized for service '{service_name}' (level: {log_level.upper()})")
    return logger