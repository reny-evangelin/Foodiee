import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String, unique=True, index=True, nullable=False)
    product_name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, default="snacks", nullable=False)
    is_veg = Column(Boolean, default=True, nullable=False)
    image_url = Column(String, nullable=True)
    description = Column(String, nullable=True)
    prep_time = Column(String, default="5-10 mins", nullable=False)
    available = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)



class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_token = Column(String, index=True, nullable=False)
    customer_name = Column(String, nullable=False)
    priority = Column(Integer, nullable=False)
    order_date = Column(Date, nullable=False)
    status = Column(String, default="PENDING", nullable=False)
    subtotal = Column(Float, nullable=False)
    final_total = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    # Relationships
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    bill = relationship("Bill", back_populates="order", uselist=False, cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, nullable=False)
    product_name = Column(String, nullable=False)
    price = Column(Float, nullable=False)  # Stored price at the time of ordering
    quantity = Column(Integer, nullable=False)
    item_total = Column(Float, nullable=False)  # price * quantity

    # Relationships
    order = relationship("Order", back_populates="items")


class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, autoincrement=True)
    bill_id = Column(String, unique=True, index=True, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    order_token = Column(String, nullable=False)
    subtotal = Column(Float, nullable=False)
    tax = Column(Float, default=0.0, nullable=False)
    discount = Column(Float, default=0.0, nullable=False)
    final_total = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    # Relationships
    order = relationship("Order", back_populates="bill")
