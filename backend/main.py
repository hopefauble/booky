from fastapi import FastAPI, HTTPException, Depends
import os
from static_files import StaticFileMiddleware


app = FastAPI()


app.mount("/", StaticFileMiddleware("../static", "index.html"))
