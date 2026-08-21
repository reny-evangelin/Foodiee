import datetime
from sqlalchemy.orm import Session
from app.database import supabase_client
from app.models import Order
from app.schemas import OrderCreate
from app.services.billing_service import BillingService

class OrderService:
    @staticmethod
    def generate_daily_token(db: Session, order_date: datetime.date, client=None) -> tuple[str, int]:
        """
        Generate a sequential token (e.g. T001, T002) and priority number 
        which resets daily. Combination of date + token is unique.
        """
        if client:
            res = client.table("orders").select("id").eq("order_date", str(order_date)).execute()
            today_order_count = len(res.data)
        else:
            today_order_count = db.query(Order).filter(Order.order_date == order_date).count()
            
        next_seq = today_order_count + 1
        token = f"T{next_seq:03d}"
        priority = next_seq
        return token, priority

    @staticmethod
    def create_order_supabase(order_data: OrderCreate) -> tuple[dict, list, dict]:
        """Process order creation directly using the Supabase client."""
        client = supabase_client
        today_date = datetime.datetime.utcnow().date()
        token, priority = OrderService.generate_daily_token(None, today_date, client=client)

        order_dict = {
            "order_token": token,
            "customer_name": order_data.customer_name,
            "priority": priority,
            "order_date": str(today_date),
            "status": "PENDING",
            "subtotal": 0.0,
            "final_total": 0.0
        }

        # Insert order record to generate ID
        res = client.table("orders").insert(order_dict).execute()
        created_order = res.data[0]
        order_id = created_order["id"]

        # Process billing & items
        bill, order_items = BillingService.process_billing_supabase(order_id, token, order_data)

        # Update order totals in memory dict
        created_order["subtotal"] = bill["subtotal"]
        created_order["final_total"] = bill["final_total"]

        return created_order, order_items, bill

    @staticmethod
    def create_order(db: Session, order_data: OrderCreate) -> tuple[Order, list, dict]:
        """
        Process order creation:
        1. Initialize Order in PENDING status.
        2. Assign sequential token and priority for today.
        3. Build order items and final Bill.
        4. Commit transaction and return results.
        """
        if supabase_client:
            return OrderService.create_order_supabase(order_data)

        today_date = datetime.datetime.utcnow().date()
        token, priority = OrderService.generate_daily_token(db, today_date)

        # Temporary placeholder values for subtotal/total (resolved in billing phase)
        new_order = Order(
            order_token=token,
            customer_name=order_data.customer_name,
            priority=priority,
            order_date=today_date,
            status="PENDING",
            subtotal=0.0,
            final_total=0.0
        )
        db.add(new_order)
        db.flush()

        # Build items and bill
        bill, order_items = BillingService.process_billing(db, new_order.id, token, order_data)

        # Update order with correct totals
        new_order.subtotal = bill.subtotal
        new_order.final_total = bill.final_total
        db.flush()

        return new_order, order_items, bill
