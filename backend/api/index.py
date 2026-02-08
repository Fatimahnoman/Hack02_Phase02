import sys
import os
from pathlib import Path

# Add the src directory to the path so we can import modules
src_path = Path(__file__).parent.parent / "src"
sys.path.insert(0, str(src_path))

from fastapi import FastAPI
from mangum import Mangum
from src.api import auth_router, todo_router
from src.database.database import create_db_and_tables
import logging
from contextlib import asynccontextmanager

# Import additional required modules
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # In serverless environments like Vercel, we don't run startup logic
    # Database initialization should happen separately
    yield
    # Shutdown

app = FastAPI(title="Evolution of Todo API", version="0.1.0", lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router, prefix="/api/auth", tags=["auth"])
app.include_router(todo_router.router, prefix="/api/todos", tags=["todos"])

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    logger.error(f"Validation error: {exc}")
    return JSONResponse(
        status_code=422,
        content={"detail": jsonable_encoder(exc.errors())},
    )

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Evolution of Todo API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Create the handler for Vercel
handler = Mangum(app, lifespan="off")

# This is the ASGI callable that Vercel will use
def handler_func(event, context):
    return handler(event, context)