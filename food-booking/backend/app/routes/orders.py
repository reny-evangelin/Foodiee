from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db, supabase_client
from app.models import Order
from app.schemas import OrderCreate, OrderResponse
from app.services.order_service import OrderService

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    """
    Place a new food order.
    Generates token, calculates bill, and returns invoice response.
    """
    try:
        # If Supabase client is active, it will use create_order_supabase
        order, items, bill = OrderService.create_order(db, order_data)
        
        if supabase_client:
            # If Supabase is active, order, items, and bill are dictionaries
            return {
                "success": True,
                "order_token": order["order_token"],
                "priority": order["priority"],
                "bill_id": bill["bill_id"],
                "customer_name": order["customer_name"],
                "items": [
                    {
                        "product_id": item["product_id"],
                        "product_name": item["product_name"],
                        "price": float(item["price"]),
                        "quantity": item["quantity"],
                        "item_total": float(item["item_total"])
                    } for item in items
                ],
                "subtotal": float(bill["subtotal"]),
                "tax": float(bill["tax"]),
                "discount": float(bill["discount"]),
                "final_total": float(bill["final_total"])
            }
            
        else:
            db.commit()
            db.refresh(order)
            db.refresh(bill)

            # Build response payload for local SQLite
            return {
                "success": True,
                "order_token": order.order_token,
                "priority": order.priority,
                "bill_id": bill.bill_id,
                "customer_name": order.customer_name,
                "items": [
                    {
                        "product_id": item.product_id,
                        "product_name": item.product_name,
                        "price": item.price,
                        "quantity": item.quantity,
                        "item_total": item.item_total
                    } for item in items
                ],
                "subtotal": bill.subtotal,
                "tax": bill.tax,
                "discount": bill.discount,
                "final_total": bill.final_total
            }
    except HTTPException as he:
        if not supabase_client:
            db.rollback()
        raise he
    except Exception as e:
        if not supabase_client:
            db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected server error occurred: {str(e)}"
        )


@router.get("/{order_token}", response_model=OrderResponse)
def get_order(order_token: str, db: Session = Depends(get_db)):
    """Retrieve full details of an order and its bill using the order token."""
    if supabase_client:
        try:
            # Query order from Supabase
            res_order = supabase_client.table("orders").select("*").eq("order_token", order_token).execute()
            if not res_order.data:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Order with token '{order_token}' not found."
                )
            order = res_order.data[0]
            order_id = order["id"]

            # Query items from Supabase
            res_items = supabase_client.table("order_items").select("*").eq("order_id", order_id).execute()
            items = res_items.data

            # Query bill from Supabase
            res_bill = supabase_client.table("bills").select("*").eq("order_id", order_id).execute()
            bill = res_bill.data[0] if res_bill.data else None

            return {
                "success": True,
                "order_token": order["order_token"],
                "priority": order["priority"],
                "bill_id": bill["bill_id"] if bill else "N/A",
                "customer_name": order["customer_name"],
                "items": [
                    {
                        "product_id": item["product_id"],
                        "product_name": item["product_name"],
                        "price": float(item["price"]),
                        "quantity": item["quantity"],
                        "item_total": float(item["item_total"])
                    } for item in items
                ],
                "subtotal": float(order["subtotal"]),
                "tax": float(bill["tax"]) if bill else 0.0,
                "discount": float(bill["discount"]) if bill else 0.0,
                "final_total": float(order["final_total"])
            }
        except HTTPException as he:
            raise he
        except Exception as e:
            print(f"⚠️ Supabase error fetching order: {e}. Falling back to SQLite.")

    # SQLite local query fallback
    order = db.query(Order).filter(Order.order_token == order_token).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with token '{order_token}' not found."
        )

    return {
        "success": True,
        "order_token": order.order_token,
        "priority": order.priority,
        "bill_id": order.bill.bill_id if order.bill else "N/A",
        "customer_name": order.customer_name,
        "items": [
            {
                "product_id": item.product_id,
                "product_name": item.product_name,
                "price": item.price,
                "quantity": item.quantity,
                "item_total": item.item_total
            } for item in order.items
        ],
        "subtotal": order.subtotal,
        "tax": order.bill.tax if order.bill else 0.0,
        "discount": order.bill.discount if order.bill else 0.0,
        "final_total": order.final_total
    }
