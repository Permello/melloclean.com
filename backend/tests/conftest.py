import os

import pytest
from sqlmodel import SQLModel, Session as DBSession, create_engine

from app.models import *  # noqa: F401, F403

DATABASE_URL = os.environ.get(
    "TEST_DATABASE_URL",
    "postgresql://melloclean:melloclean_dev@localhost:5432/melloclean",
)

engine = create_engine(DATABASE_URL)


@pytest.fixture(autouse=True)
def db():
    SQLModel.metadata.create_all(engine)
    with DBSession(engine) as session:
        yield session
        session.rollback()
