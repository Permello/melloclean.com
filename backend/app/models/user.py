import uuid
from datetime import datetime, timezone

from sqlmodel import Field, SQLModel

from app.models.enums import Role


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    password_hash: str
    first_name: str
    last_name: str
    phone: str | None = Field(default=None)
    role: Role = Field(default=Role.CLIENT)
    email_verified: bool = Field(default=False)
    email_verified_at: datetime | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
