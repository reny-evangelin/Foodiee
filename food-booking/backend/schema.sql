-- ==========================================
-- Supabase SQL Editor Table Definitions
-- ==========================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_token VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    priority INT NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    subtotal NUMERIC(10, 2) NOT NULL,
    final_total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    item_total NUMERIC(10, 2) NOT NULL
);

-- 4. Bills Table
CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    bill_id VARCHAR(100) UNIQUE NOT NULL,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    order_token VARCHAR(50) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    tax NUMERIC(10, 2) DEFAULT 0.0,
    discount NUMERIC(10, 2) DEFAULT 0.0,
    final_total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed 25 fixed products
INSERT INTO products (product_id, product_name, price, available) VALUES
('FOOD001', 'Idli', 30.0, true),
('FOOD002', 'Dosa', 50.0, true),
('FOOD003', 'Masala Dosa', 70.0, true),
('FOOD004', 'Poori', 50.0, true),
('FOOD005', 'Vada', 20.0, true),
('FOOD006', 'Pongal', 50.0, true),
('FOOD007', 'Parotta', 25.0, true),
('FOOD008', 'Chapati', 25.0, true),
('FOOD009', 'Veg Meals', 100.0, true),
('FOOD010', 'Chicken Biriyani', 120.0, true),
('FOOD011', 'Veg Biriyani', 90.0, true),
('FOOD012', 'Fried Rice', 90.0, true),
('FOOD013', 'Noodles', 90.0, true),
('FOOD014', 'Samosa', 15.0, true),
('FOOD015', 'Puffs', 25.0, true),
('FOOD016', 'Sandwich', 60.0, true),
('FOOD017', 'Burger', 80.0, true),
('FOOD018', 'French Fries', 70.0, true),
('FOOD019', 'Tea', 15.0, true),
('FOOD020', 'Coffee', 20.0, true),
('FOOD021', 'Lemon Juice', 30.0, true),
('FOOD022', 'Fresh Juice', 50.0, true),
('FOOD023', 'Water Bottle', 20.0, true),
('FOOD024', 'Curd Rice', 60.0, true),
('FOOD025', 'Egg Rice', 90.0, true)
ON CONFLICT (product_id) DO UPDATE 
SET product_name = EXCLUDED.product_name, price = EXCLUDED.price;
