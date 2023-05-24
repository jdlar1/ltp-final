from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.xbee import xbee
from app.routes.devices.router import router as device_router
from app.routes.io.router import router as io_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        xbee.open()
        yield
    finally:
        if xbee is not None and xbee.is_open():
            xbee.close()


app = FastAPI(lifespan=lifespan) # type: ignore

app.include_router(device_router, prefix = "/devices")
app.include_router(io_router, prefix = "/io")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
