import os
import sendgrid
from sendgrid.helpers.mail import Mail
from app.config import Config
import logging
import certifi
import os
os.environ['SSL_CERT_FILE'] = certifi.where()

logger = logging.getLogger(__name__)

def send_email(to_email, subject, html_content):
    try:
        sg = sendgrid.SendGridAPIClient(api_key=Config.SENDGRID_API_KEY)

        from_email = Config.EMAIL_SENDER
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=html_content
        )

        response = sg.send(message)
        logger.info("SendGrid Response: %s", response.status_code)

        return response.status_code in [200, 202]

    except Exception as e:
        logger.exception("Error sending email via SendGrid: %s", str(e))
        return False