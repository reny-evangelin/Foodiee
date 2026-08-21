import os
import sys

# Ensure the parent directory is in sys.path to allow absolute imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import engine, SessionLocal, Base
from app.models import Product

# Food Menu Data matching Section 2 specification
FOOD_PRODUCTS = [
    {"product_id": "FOOD001", "product_name": "Idli", "price": 30.0},
    {"product_id": "FOOD002", "product_name": "Dosa", "price": 50.0},
    {"product_id": "FOOD003", "product_name": "Masala Dosa", "price": 70.0},
    {"product_id": "FOOD004", "product_name": "Poori", "price": 50.0},
    {"product_id": "FOOD005", "product_name": "Vada", "price": 20.0},
    {"product_id": "FOOD006", "product_name": "Pongal", "price": 50.0},
    {"product_id": "FOOD007", "product_name": "Parotta", "price": 25.0},
    {"product_id": "FOOD008", "product_name": "Chapati", "price": 25.0},
    {"product_id": "FOOD009", "product_name": "Veg Meals", "price": 100.0},
    {"product_id": "FOOD010", "product_name": "Chicken Biriyani", "price": 120.0},
    {"product_id": "FOOD011", "product_name": "Veg Biriyani", "price": 90.0},
    {"product_id": "FOOD012", "product_name": "Fried Rice", "price": 90.0},
    {"product_id": "FOOD013", "product_name": "Noodles", "price": 90.0},
    {"product_id": "FOOD014", "product_name": "Samosa", "price": 15.0},
    {"product_id": "FOOD015", "product_name": "Puffs", "price": 25.0},
    {"product_id": "FOOD016", "product_name": "Sandwich", "price": 60.0},
    {"product_id": "FOOD017", "product_name": "Burger", "price": 80.0},
    {"product_id": "FOOD018", "product_name": "French Fries", "price": 70.0},
    {"product_id": "FOOD019", "product_name": "Tea", "price": 15.0},
    {"product_id": "FOOD020", "product_name": "Coffee", "price": 20.0},
    {"product_id": "FOOD021", "product_name": "Lemon Juice", "price": 30.0},
    {"product_id": "FOOD022", "product_name": "Fresh Juice", "price": 50.0},
    {"product_id": "FOOD023", "product_name": "Water Bottle", "price": 20.0},
    {"product_id": "FOOD024", "product_name": "Curd Rice", "price": 60.0},
    {"product_id": "FOOD025", "product_name": "Egg Rice", "price": 90.0}
]

def seed_db():
    # Force recreate SQLite database tables
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if products table already contains data
        product_count = db.query(Product).count()
        if product_count > 0:
            print("Database already seeded with products.")
            return

        print("Seeding 25 canteen products...")
        for p in FOOD_PRODUCTS:
            db_product = Product(
                product_id=p["product_id"],
                product_name=p["product_name"],
                price=p["price"],
                available=True
            )
            db.add(db_product)
        
        db.commit()
        print("✅ Seeding completed successfully.")
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
