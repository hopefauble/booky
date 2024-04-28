from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .entity_base import EntityBase
from typing import Self
from ..models import User

class UserEntity(EntityBase):

    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String)
    password: Mapped[str] = mapped_column(String)

    @classmethod
    def from_model(cls, model: User) -> Self:
        return cls(
            id=model.id,
            username=model.username,
            password=model.password
        )
    
    def to_model(self) -> User:
        return User(
            id=self.id,
            username=self.username,
            password=self.password
        )