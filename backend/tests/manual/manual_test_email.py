# Copyright 2026 Eduardo Turcios. All rights reserved.
# Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
"""Manual test script for the email service.

Run from the backend directory:
    python -m tests.manual.manual_test_email
"""

from app.services.email_service import (
    VERIFICATION_HTML,
    PASSWORD_RESET_HTML,
    send_verification_email,
    send_password_reset_email,
)
from app.config import Config

EMAIL = Config.GMAIL_SENDER

print("--- Verification HTML preview ---")
print(VERIFICATION_HTML.format(first_name="Eddie", verification_url="https://melloclean.com/verify?token=test123"))

print("\n--- Password Reset HTML preview ---")
print(PASSWORD_RESET_HTML.format(first_name="Eddie", reset_url="https://melloclean.com/reset?token=test456"))

print("\nSending verification email...")
send_verification_email("Eddie", EMAIL, "https://melloclean.com/verify?token=test123")
print("Verification email sent!")

print("Sending password reset email...")
send_password_reset_email("Eddie", EMAIL, "https://melloclean.com/reset?token=test456")
print("Password reset email sent!")
