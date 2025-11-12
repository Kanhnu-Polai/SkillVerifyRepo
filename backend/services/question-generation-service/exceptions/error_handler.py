from flask import jsonify
from exceptions.exception_classes import BaseLevelException
from exceptions.error_codes_enum import ErrorCodeEnum
from http import HTTPStatus
import logging

logger = logging.getLogger("question-generator-service")

def register_error_handlers(app):


    @app.errorhandler(BaseLevelException)
    def handle_custom_exception(error):
        # 🧩 Logging is important
        logger.error(f"⚠️ {error.error_code.code}: {error.message}")

        # ✅ Always cast to int in case status_code is an Enum
        response = jsonify(error.to_dict())
        return response, int(error.status_code)

    @app.errorhandler(Exception)
    def handle_unexpected_exceptions(error):
        # 🧩 Log full traceback for debugging
        logger.exception("💥 Unhandled Exception occurred")

        # ✅ Create a standardized generic error
        generic_error = BaseLevelException(
            error_code=ErrorCodeEnum.INTERNAL_SERVER_ERROR,
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            custom_message=str(error)
        )

        response = jsonify(generic_error.to_dict())
        return response, HTTPStatus.INTERNAL_SERVER_ERROR.value