"""user API

user routes are used to create, retrieve, and update Pomodoro timers."""

from fastapi import APIRouter, Depends

from models.user_model import User
from backend.services import UserService

__authors__ = ["Ajay Gandecha"]
__copyright__ = "Copyright 2024"
__license__ = "MIT"

api = APIRouter(prefix="/api/users")
openapi_tags = {
    "name": "Users",
    "description": "Create, update, delete, and retrieve users.",
}


@api.get("", response_model=list[User], tags=["user"])
def get_timers(
    user_service: UserService = Depends(),
) -> list[User]:

    # Return all pomodoro timers
    return user_service.get_users()

@api.get("/{id}", response_model=User, tags=["user"])
def get_timer(
    id: int,
    user_service: UserService = Depends(),
) -> User:

    return user_service.getUserById(id)

@api.post("", response_model=User, tags=["user"])
def create_timer(
    user: User,
    user_service: UserService = Depends(),
) -> User:
    return user_service.create_user(user)


# PUT /api/user
# Updates a pomodoro timer.
# Note: This API will take in a request body. What type should this be?
# Expected return type: User
@api.put("", response_model=User, tags=["user"])
def update_timer(
    user: User,
    user_service: UserService = Depends(),
) -> User:
    return user_service.update_user(user)


# DELETE /api/user/{id}
# Deletes a pomodoro timer.
# Expected return type: User
@api.delete("/{id}", response_model=None, tags=["user"])
def delete_timer(
    id: int,
    user_service: userService = Depends(),
) -> User:
    return user_service.delete_user(id)