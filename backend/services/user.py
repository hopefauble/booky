"""Stand-in data layer until we connect to the database.

This file provides some overly simplistic access functions to support the minimum
API of this exercise. Ultimately, functions like these will be backed by an actual
storage system such as a relational database.
"""
from datetime import datetime
from models.user import User

_users: dict[int, User] = {}
"""Private module data simulating a simple key-value store where keys are PID and values are User objects. Do not reference externally."""



class UserService:
    def reset(self):
        global _users
        _users = {}

    def create_user(self, user: User) -> User:

        global _users

        if len(user.username) == 0 or len(user.password) == 0:
            raise Exception(f"Username and password required.")

        if user.username in _users:
            raise Exception(f"User with username {user.pid} already registered.")
        
        _users[user.id] = user

        return user

    def get_users(self) -> list[User]:

        global _users
        return list(_users.values())

    def get_user_by_id(self, id: int) -> User | None:
        global _users
        return _users[id] if id in _users else None
    

