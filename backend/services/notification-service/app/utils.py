import logging

#Logger setup

def setup_logger():
    log = logging.getLogger('notification-service')
    log.setLevel(logging.DEBUG)

    handler = logging.FileHandler('notification-service')
    handler.setLevel(logging.DEBUG)


    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)

    log.addHandler(handler)
    return log

logger = setup_logger()