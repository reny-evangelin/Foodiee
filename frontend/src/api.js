export const API_BASE_URL = 'http://localhost:8000/api';

const mockImages = [
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
];

const categoryMap = ['breakfast', 'snacks', 'meals', 'beverages'];

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    
    // Map backend data to frontend UI structure using real backend metadata
    return data.map((p) => ({
      id: p.product_id,
      name: p.product_name,
      category: p.category || 'snacks',
      price: p.price,
      prepTime: p.prep_time || '5-10 mins',
      tag: p.is_veg ? 'Fresh Veg' : 'Non-Veg Special',
      isVeg: p.is_veg !== undefined ? p.is_veg : true,
      description: p.description || `Delicious ${p.product_name}, freshly prepared for you.`,
      image: p.image_url || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


export async function submitOrder(customerName, items) {
  // Format items for backend: { product_id, quantity }
  const orderItems = items.map(cartEntry => ({
    product_id: cartEntry.item.id,
    quantity: cartEntry.quantity
  }));

  const payload = {
    customer_name: customerName,
    items: orderItems
  };

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error('Failed to place order');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}
