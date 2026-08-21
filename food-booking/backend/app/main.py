import os
import sys
import uvicorn

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.orders import router as orders_router
from app.routes.products import router as products_router

app = FastAPI(
    title="College Food Ordering & Billing Backend API",
    description="FastAPI Backend service with SQLite, SQLAlchemy and Pydantic",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(orders_router)
app.include_router(products_router)

# Mount static frontend directory if present (for single Docker image serving)
static_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static")
if not os.path.exists(static_dir):
    static_dir = os.path.join(os.getcwd(), "static")

if os.path.exists(static_dir):
    from fastapi.staticfiles import StaticFiles
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
else:
    @app.get("/")
    def index():
        return {
            "message": "Welcome to College Food Ordering & Billing API 🍔",
            "docs": "/docs"
        }


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    print(f"[SERVER] Starting Uvicorn server on http://localhost:{port}")
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)

