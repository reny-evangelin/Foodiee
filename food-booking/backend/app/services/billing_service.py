import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.database import supabase_client
from app.models import Product, OrderItem, Bill
from app.schemas import OrderCreate

class BillingService:
    @staticmethod
    def generate_bill_id(db: Session, client=None) -> str:
        """Generate unique daily/yearly sequential Bill ID: BILL202600001"""
        current_year = datetime.datetime.utcnow().year
        
        if client:
            try:
                res = client.table("bills").select("id").like("bill_id", f"BILL{current_year}%").execute()
                count = len(res.data) if res.data else 0
            except Exception:
                count = 0
        else:
            count = db.query(Bill).filter(
                Bill.bill_id.like(f"BILL{current_year}%")
            ).count()
            
        candidate = f"BILL{current_year}{count + 1:05d}"
        if not client and db:
            existing = db.query(Bill).filter(Bill.bill_id == candidate).first()
            if existing:
                import time
                candidate = f"BILL{current_year}{count + 1:05d}-{int(time.time() * 1000) % 1000:03d}"
        return candidate


    @staticmethod
    def process_billing_supabase(order_id: int, order_token: str, order_create_data: OrderCreate):
        """Process billing and inserts directly using the Supabase client."""
        client = supabase_client
        subtotal = 0.0
        order_items_to_insert = []
        response_items = []

        for item_data in order_create_data.items:
            # Fetch product details
            res = client.table("products").select("*").eq("product_id", item_data.product_id).execute()
            if not res.data:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Product with ID '{item_data.product_id}' not found."
                )
            product = res.data[0]
            if not product.get("available", True):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product '{product['product_name']}' is currently unavailable."
                )

            item_total = float(product["price"]) * item_data.quantity
            subtotal += item_total

            item_dict = {
                "order_id": order_id,
                "product_id": product["product_id"],
                "product_name": product["product_name"],
                "price": float(product["price"]),
                "quantity": item_data.quantity,
                "item_total": item_total
            }
            order_items_to_insert.append(item_dict)
            response_items.append(item_dict)

        # Batch insert order items
        client.table("order_items").insert(order_items_to_insert).execute()

        # Generate unique bill
        bill_id = BillingService.generate_bill_id(None, client=client)
        bill_dict = {
            "bill_id": bill_id,
            "order_id": order_id,
            "order_token": order_token,
            "subtotal": subtotal,
            "tax": 0.0,
            "discount": 0.0,
            "final_total": subtotal
        }

        # Insert bill record
        client.table("bills").insert(bill_dict).execute()

        # Update order totals in Supabase
        client.table("orders").update({
            "subtotal": subtotal,
            "final_total": subtotal
        }).eq("id", order_id).execute()

        return bill_dict, response_items

    @staticmethod
    def process_billing(db: Session, order_id: int, order_token: str, order_create_data: OrderCreate):
        """
        Validate prices from database, calculate subtotals,
        insert order items, and construct the final Bill record.
        """
        subtotal = 0.0
        order_items = []

        for item_data in order_create_data.items:
            # Query product from DB
            product = db.query(Product).filter(Product.product_id == item_data.product_id).first()
            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Product with ID '{item_data.product_id}' not found."
                )
            if not product.available:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product '{product.product_name}' is currently unavailable."
                )

            item_total = product.price * item_data.quantity
            subtotal += item_total

            # Create OrderItem record
            order_item = OrderItem(
                order_id=order_id,
                product_id=product.product_id,
                product_name=product.product_name,
                price=product.price,
                quantity=item_data.quantity,
                item_total=item_total
            )
            db.add(order_item)
            order_items.append(order_item)

        # Flush items to generate IDs
        db.flush()

        # Create Bill record
        tax = 0.0
        discount = 0.0
        final_total = subtotal + tax - discount
        bill_id = BillingService.generate_bill_id(db)

        bill = Bill(
            bill_id=bill_id,
            order_id=order_id,
            order_token=order_token,
            subtotal=subtotal,
            tax=tax,
            discount=discount,
            final_total=final_total
        )
        db.add(bill)
        db.flush()

        return bill, order_items
