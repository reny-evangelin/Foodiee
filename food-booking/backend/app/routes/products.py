from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, supabase_client
from app.models import Product
from app.schemas import ProductResponse

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    """Return all available fixed food products."""
    if supabase_client:
        try:
            res = supabase_client.table("products").select("*").eq("available", True).execute()
            # Conform field names if needed, but they match standard
            return res.data
        except Exception as e:
            print(f"⚠️ Supabase products table error: {e}. Falling back to local SQLite.")
            
    products = db.query(Product).filter(Product.available == True).all()
    return products
