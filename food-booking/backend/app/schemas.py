from pydantic import BaseModel, Field, field_validator
from typing import List, Optional

class ProductResponse(BaseModel):
    product_id: str
    product_name: str
    price: float
    available: bool

    class Config:
        from_attributes = True


class OrderItemCreate(BaseModel):
    product_id: str = Field(..., description="ID of the food item")
    quantity: int = Field(..., description="Quantity ordered")

    @field_validator("quantity")
    @classmethod
    def validate_quantity(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("Quantity must be greater than zero")
        return value


class OrderCreate(BaseModel):
    customer_name: str = Field(..., description="Customer name placing the order")
    items: List[OrderItemCreate] = Field(..., description="List of items ordered")

    @field_validator("customer_name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value_stripped = value.strip()
        if not value_stripped:
            raise ValueError("Customer name cannot be empty")
        return value_stripped

    @field_validator("items")
    @classmethod
    def validate_items(cls, value: List[OrderItemCreate]) -> List[OrderItemCreate]:
        if not value:
            raise ValueError("Order must contain at least one item")
        return value


class OrderItemResponse(BaseModel):
    product_id: str
    product_name: str
    price: float
    quantity: int
    item_total: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    success: bool = True
    order_token: str
    priority: int
    bill_id: str
    customer_name: str
    items: List[OrderItemResponse]
    subtotal: float
    tax: float
    discount: float
    final_total: float

    class Config:
        from_attributes = True
