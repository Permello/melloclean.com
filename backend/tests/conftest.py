import os
from pathlib import Path

from dotenv import load_dotenv
import pytest
from sqlmodel import SQLModel, Session as DBSession, create_engine

from app.models import *
from app.utils.config import DATABASE_URL  # noqa: F401, F403

engine = create_engine(DATABASE_URL)

@pytest.fixture(autouse=True)
def db():
    SQLModel.metadata.create_all(engine)
    with DBSession(engine) as session:
        yield session
        session.rollback()
