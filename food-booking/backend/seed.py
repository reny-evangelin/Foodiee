import os
import sys

# Ensure the parent directory is in sys.path to allow absolute imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import engine, SessionLocal, Base
from app.models import Product

FOOD_PRODUCTS = [
    {
        "product_id": "FOOD001",
        "product_name": "Idli",
        "price": 30.0,
        "category": "breakfast",
        "is_veg": True,
        "prep_time": "4 mins",
        "description": "Steamed fluffy rice cakes served with sambar and fresh coconut chutney.",
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD002",
        "product_name": "Dosa",
        "price": 50.0,
        "category": "breakfast",
        "is_veg": True,
        "prep_time": "5 mins",
        "description": "Crispy golden fermented crepe served with chutneys and sambar.",
        "image_url": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD003",
        "product_name": "Masala Dosa",
        "price": 70.0,
        "category": "breakfast",
        "is_veg": True,
        "prep_time": "6 mins",
        "description": "Crispy dosa stuffed with spiced potato mash, served with sambar and chutneys.",
        "image_url": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD004",
        "product_name": "Poori",
        "price": 50.0,
        "category": "breakfast",
        "is_veg": True,
        "prep_time": "6 mins",
        "description": "3 golden puffed fried breads served with aromatic spiced potato bhaji.",
        "image_url": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD005",
        "product_name": "Vada",
        "price": 20.0,
        "category": "breakfast",
        "is_veg": True,
        "prep_time": "3 mins",
        "description": "Crispy savory lentil doughnut spiced with black pepper and cumin.",
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD006",
        "product_name": "Pongal",
        "price": 50.0,
        "category": "breakfast",
        "is_veg": True,
        "prep_time": "4 mins",
        "description": "Comforting ghee-laden rice and moong dal porridge tempered with cashews & pepper.",
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD007",
        "product_name": "Parotta",
        "price": 25.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "5 mins",
        "description": "Flaky layered South Indian flatbread served with spicy kurma gravy.",
        "image_url": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD008",
        "product_name": "Chapati",
        "price": 25.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "4 mins",
        "description": "Soft whole-wheat flatbread cooked on tawa, served with vegetable curry.",
        "image_url": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD009",
        "product_name": "Veg Meals",
        "price": 100.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "8 mins",
        "description": "Full South Indian meal with steamed rice, sambar, rasam, kootu, poriyal & curd.",
        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD010",
        "product_name": "Chicken Biriyani",
        "price": 120.0,
        "category": "meals",
        "is_veg": False,
        "prep_time": "5 mins",
        "description": "Aromatic basmati rice layered with tender marinated chicken pieces & spices.",
        "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD011",
        "product_name": "Veg Biriyani",
        "price": 90.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "6 mins",
        "description": "Fragrant basmati rice cooked with garden fresh vegetables & whole biryani spices.",
        "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD012",
        "product_name": "Fried Rice",
        "price": 90.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "7 mins",
        "description": "Indo-Chinese wok-tossed fried rice with crunchy vegetables & soy seasoning.",
        "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD013",
        "product_name": "Noodles",
        "price": 90.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "7 mins",
        "description": "Stir-fried Hakka noodles tossed with cabbage, capsicum, carrots and Schezwan sauce.",
        "image_url": "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD014",
        "product_name": "Samosa",
        "price": 15.0,
        "category": "snacks",
        "is_veg": True,
        "prep_time": "2 mins",
        "description": "Crispy golden fried pastry filled with spiced potato and green peas.",
        "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD015",
        "product_name": "Puffs",
        "price": 25.0,
        "category": "snacks",
        "is_veg": True,
        "prep_time": "2 mins",
        "description": "Flaky oven-baked puff pastry packed with savory spiced vegetable filling.",
        "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD016",
        "product_name": "Sandwich",
        "price": 60.0,
        "category": "snacks",
        "is_veg": True,
        "prep_time": "5 mins",
        "description": "Grilled bread sandwich loaded with fresh veggies, mint chutney & cheese.",
        "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD017",
        "product_name": "Burger",
        "price": 80.0,
        "category": "snacks",
        "is_veg": True,
        "prep_time": "6 mins",
        "description": "Crispy veg patty burger layered with lettuce, tomato, cheese slice & mayo.",
        "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD018",
        "product_name": "French Fries",
        "price": 70.0,
        "category": "snacks",
        "is_veg": True,
        "prep_time": "5 mins",
        "description": "Deep-fried golden potato fingers seasoned with salt & peri-peri spice mix.",
        "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD019",
        "product_name": "Tea",
        "price": 15.0,
        "category": "beverages",
        "is_veg": True,
        "prep_time": "2 mins",
        "description": "Hot brewed milk tea infused with cardamom and fresh ginger.",
        "image_url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD020",
        "product_name": "Coffee",
        "price": 20.0,
        "category": "beverages",
        "is_veg": True,
        "prep_time": "2 mins",
        "description": "Authentic hot South Indian filter coffee brewed with chicory blend.",
        "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD021",
        "product_name": "Lemon Juice",
        "price": 30.0,
        "category": "beverages",
        "is_veg": True,
        "prep_time": "2 mins",
        "description": "Refreshing chilled fresh lemon juice with mint and black salt.",
        "image_url": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD022",
        "product_name": "Fresh Juice",
        "price": 50.0,
        "category": "beverages",
        "is_veg": True,
        "prep_time": "3 mins",
        "description": "Freshly extracted seasonal fruit juice (Orange/Watermelon/Mango).",
        "image_url": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD023",
        "product_name": "Water Bottle",
        "price": 20.0,
        "category": "beverages",
        "is_veg": True,
        "prep_time": "1 min",
        "description": "1 Litre chilled packaged mineral water bottle.",
        "image_url": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD024",
        "product_name": "Curd Rice",
        "price": 60.0,
        "category": "meals",
        "is_veg": True,
        "prep_time": "3 mins",
        "description": "Creamy seasoned curd rice tempered with mustard seeds, curry leaves & pomegranate.",
        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "product_id": "FOOD025",
        "product_name": "Egg Rice",
        "price": 90.0,
        "category": "meals",
        "is_veg": False,
        "prep_time": "7 mins",
        "description": "Spicy wok-tossed fried rice cooked with scrambled eggs, onions and herbs.",
        "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
    }
]

def seed_db():
    # Force recreate SQLite database tables
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        print("Seeding 25 canteen products with full metadata...")
        for p in FOOD_PRODUCTS:
            db_product = Product(
                product_id=p["product_id"],
                product_name=p["product_name"],
                price=p["price"],
                category=p["category"],
                is_veg=p["is_veg"],
                prep_time=p["prep_time"],
                description=p["description"],
                image_url=p["image_url"],
                available=True
            )
            db.add(db_product)
        
        db.commit()
        print("[SUCCESS] Seeding completed successfully.")
    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()


