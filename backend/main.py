from fastapi import FastAPI, HTTPException, Depends
from models.user import User
from services.storage import StorageService
import os
from models.checkin import Checkin
from models.checkin_request import CheckinRequest
from static_files import StaticFileMiddleware


app = FastAPI()


@app.get("/api/registrations")
def list_registrations(storage_service: StorageService = Depends()) -> list[User]:
    """List all registrations in the system."""
    return storage_service.get_registrations()


@app.post("/api/registrations")
def new_registration(user: User, storage_service: StorageService = Depends()) -> User:
    """Create a new user/registration."""
    print('registered!')
    try:
        return storage_service.create_registration(user)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))


@app.post("/api/reset")
def reset(storage_service: StorageService = Depends()) -> str:
    """Development-only route for resetting storage module and adding fake user and checkin."""
    if "MODE" in os.environ and os.environ["MODE"] == "production":
        raise HTTPException(status_code=404, detail="Not Found")
    else:
        storage_service.reset()
        # dummy registration 1
        storage_service.create_registration(User(pid=710453084, first_name="Kris", last_name="Jordan"))
        storage_service.create_checkin(710453084)
        # dummy registration 2
        storage_service.create_registration(User(pid=730489157, first_name='Logan', last_name='Stach'))
        storage_service.create_checkin(730489157)
        return "OK"

@app.post("/api/checkin")
def checkin(request: CheckinRequest, storage_service: StorageService = Depends()) -> Checkin:
    """Create a new checkin."""
    try:
        return storage_service.create_checkin(request.pid)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

    
@app.get("/api/checkin")
def checkin(storage_service: StorageService = Depends()) -> list[Checkin]:
    """List all checkins."""
    try:
        return storage_service.get_checkins()
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
    
@app.delete("/api/registrations/$PID")
def deleteUser(pid: int, storage_service: StorageService = Depends()):
    """Delete user with given pid."""
    print('delete function')
    print('pid = ', pid)
    try:
        return storage_service.delete_user(pid)
    except Exception as e:
        raise HTTPException(status_code=402, detail=str(e))

app.mount("/", StaticFileMiddleware("../static", "index.html"))
