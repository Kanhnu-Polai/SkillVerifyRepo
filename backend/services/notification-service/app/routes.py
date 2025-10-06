from flask import Blueprint, request, jsonify
from .email_service import send_email
import logging

routes = Blueprint('routes', __name__)
logger = logging.getLogger(__name__)

@routes.route('/test-email', methods=['POST'])
def test_email():
    logger.info("Called")
    try:
        data = request.get_json()

        # Validation
        if not data or 'email' not in data:
            logger.warning("Email field missing in request data: %s", data)
            return jsonify({"error": "Email is required"}), 400

        recipient = data["email"]
        subject = "Test Email"
        html_content = "<h1>This is a test email from SkillVerify Notification Service</h1>"

        success = send_email(recipient, subject, html_content)

        if success:
            logger.info("Test email sent to %s", recipient)
            return jsonify({"status": "sent"}), 200
        else:
            logger.error("Failed to send test email to %s", recipient)
            return jsonify({"status": "failed", "error": "Could not send email"}), 500

    except Exception as e:
        logger.exception("Exception occurred in /test-email: %s", str(e))
        return jsonify({"error": "Internal Server Error"}), 500