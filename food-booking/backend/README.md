# College Food Ordering & Billing Backend API 🍕🍔

A high-performance, secure backend REST API for a college canteen food ordering and token generation system. Built with Python 3.10+, FastAPI, SQLAlchemy, SQLite, and Pydantic.

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Initialize Database & Seed Menu
Initialize the SQLite database (`database.db`) and seed the 25 fixed food items:
```bash
python seed.py
```

### 3. Run FastAPI Application
Start the server locally at `http://localhost:8000`:
```bash
python app/main.py
```
*(Interactive API documentation will be available at `http://localhost:8000/docs`)*

---

## 📡 API Endpoints

### 1. Place a New Food Order
- **URL**: `POST /api/orders`
- **Request Body**:
  ```json
  {
    "customer_name": "Arun",
    "items": [
      {
        "product_id": "FOOD001",
        "quantity": 2
      },
      {
        "product_id": "FOOD010",
        "quantity": 1
      }
    ]
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "order_token": "T001",
    "priority": 1,
    "bill_id": "BILL202600001",
    "customer_name": "Arun",
    "items": [
      {
        "product_id": "FOOD001",
        "product_name": "Idli",
        "price": 30.0,
        "quantity": 2,
        "item_total": 60.0
      },
      {
        "product_id": "FOOD010",
        "product_name": "Chicken Biriyani",
        "price": 120.0,
        "quantity": 1,
        "item_total": 120.0
      }
    ],
    "subtotal": 180.0,
    "tax": 0.0,
    "discount": 0.0,
    "final_total": 180.0
  }
  ```

### 2. Get Order Details & Bill by Token
- **URL**: `GET /api/orders/{order_token}`
- **Example**: `GET /api/orders/T001`
- **Response (200 OK)**: Complete order history and itemized billing invoice.

### 3. Get Canteen Food Products Menu
- **URL**: `GET /api/products`
- **Response (200 OK)**:
  ```json
  [
    {
      "product_id": "FOOD001",
      "product_name": "Idli",
      "price": 30.0,
      "available": true
    }
  ]
  ```

---

## 🔒 Price Security & Token Generation Rules

1. **Price Security**: The frontend only sends the product ID and quantity. Product pricing is queried directly from the SQLite database.
2. **Daily-Resetting Tokens**: Order tokens (`T001`, `T002`, etc.) reset daily and map directly to queue priority numbers (`Priority 1`, `Priority 2`, etc.). Date + token combinations are unique.
3. **Bill Generation**: Unique bill IDs are generated automatically (e.g. `BILL202600001`).
