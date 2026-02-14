import os
from pathlib import Path

from dotenv import load_dotenv


env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

print("Looking for .env at:", env_path)
DATABASE_URL = os.environ.get( "LOCAL_DATABASE_URL", "DATABASE_URL", )