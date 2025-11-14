
import logging
import sys
import os
from logging.handlers import RotatingFileHandler


def setup_logger(service_name="question-generator", log_level="INFO", log_file="log/app.log"):

    # --- Fix: Safe fallback for log level ---
    log_level = (log_level or "INFO").upper()

    # --- Fix: Ensure log directory exists ---
    log_dir = os.path.dirname(log_file) or "."
    os.makedirs(log_dir, exist_ok=True)

    logger = logging.getLogger(service_name)
    logger.setLevel(log_level)

    # Avoid duplicate handlers in reloads
    if logger.handlers:
        return logger

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    # --- Console Logger ---
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    console_handler.setLevel(log_level)

    # --- File Logger with rotation ---
    file_handler = RotatingFileHandler(
        log_file, maxBytes=5_000_000, backupCount=5
    )
    file_handler.setFormatter(formatter)
    file_handler.setLevel(log_level)

    # Attach handlers
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    # Reduce noise logs
    logging.getLogger("werkzeug").setLevel(logging.WARNING)
    logging.getLogger("pymongo").setLevel(logging.WARNING)

    logger.info(f"🪵 Logger initialized for service '{service_name}' (level: {log_level})")

    return logger