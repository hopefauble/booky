from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import db_session
from ..models import User
from .user import UserEntity

class UserService:

    def __init__(
        self,
        session: Session = Depends(db_session),
    ):
        """Initializes the `EventService` session"""
        self._session = session

    def all(self) -> list[User]:

        query = select(UserEntity)
        entites = self._session.scalars(query).all()

        return [entity.toModel() for entity in entites]
    
    def create(self, user: User):

        userEntity = UserEntity.fromModel(user)

        self._session.add(userEntity)
        self._session.commit()

        return userEntity.toModel()
    
    def getByID(self, id: int):

        user = (
            self._session.query(UserEntity)
            .filter(UserEntity.id == id)
            .one_or_none()
        )

        # Check if result is null
        if user is None:
            raise ResourceNotFoundException(
                f"No user found with matching id: {id}"
            )

        return user.to_model()
    
    def getIDbyLogin(self, username: str, password: str):

        user = (
            self._session.query(UserEntity)
            .filter(UserEntity.username == username)
            .filter(UserEntity.password == password)
            .one_or_none()
        )

        if user is None:
            raise ResourceNotFoundException(
                f"No user found with matching username: {username}"
            )

