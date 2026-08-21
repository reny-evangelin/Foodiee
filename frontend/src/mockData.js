/**
 * QUICKBITE - MOCK FOOD DATA
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * Replace this static file or replace `getFoodItems()` with a fetch call to your API endpoint
 * e.g., `fetch('/api/v1/menu')`.
 * Data structures are kept clean and decoupled to make API integration seamless.
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
  { id: 'snacks', name: 'Snacks & Quick Bites', icon: '🍕' },
  { id: 'meals', name: 'Full Meals', icon: '🍛' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' }
];

export const FOOD_ITEMS = [
  // BREAKFAST
  {
    id: 'b1',
    name: 'Classic Egg & Cheese Roll',
    category: 'breakfast',
    price: 45,
    prepTime: '5 mins',
    tag: 'Bestseller',
    isVeg: false,
    description: 'Fluffy scrambled eggs, sharp cheddar & spicy onion wrapped in a toasted whole wheat paratha.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b2',
    name: 'Puri Bhaji Express',
    category: 'breakfast',
    price: 50,
    prepTime: '6 mins',
    tag: 'Hot & Fresh',
    isVeg: true,
    description: '3 golden crisp puris served with aromatic spiced potato bhaji and tangy lemon pickle.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b3',
    name: 'Triple Deck Veg Grilled Sandwich',
    category: 'breakfast',
    price: 55,
    prepTime: '7 mins',
    tag: 'Popular',
    isVeg: true,
    description: 'Crunchy cucumber, juicy tomato, spiced potato mash, green chutney & melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b4',
    name: 'South Indian Mini Tiffin',
    category: 'breakfast',
    price: 60,
    prepTime: '4 mins',
    tag: 'Quick Prep',
    isVeg: true,
    description: '2 steamed fluffy idlis + 1 crispy medu vada served with steaming hot sambar and fresh coconut chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  },

  // SNACKS
  {
    id: 's1',
    name: 'Butter Samosa Pav Duo',
    category: 'snacks',
    price: 35,
    prepTime: '3 mins',
    tag: 'Pocket Friendly',
    isVeg: true,
    description: '2 hot crispy potato samosas tucked inside butter-toasted Ladi Pav with spicy garlic dry chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's2',
    name: 'Tandoori Paneer Roll Supreme',
    category: 'snacks',
    price: 75,
    prepTime: '8 mins',
    tag: 'Chef Choice',
    isVeg: true,
    description: 'Char-grilled marinated paneer cubes tossed with bell peppers and mayo in a soft laccha paratha.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's3',
    name: 'Peri-Peri Fries Basket',
    category: 'snacks',
    price: 60,
    prepTime: '5 mins',
    tag: 'Crispy',
    isVeg: true,
    description: 'Golden extra-crisp potato fries dusted with fiery African peri-peri spice mix and cheesy dip.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's4',
    name: 'Crispy Chicken Nuggets (6 Pcs)',
    category: 'snacks',
    price: 90,
    prepTime: '6 mins',
    tag: 'High Protein',
    isVeg: false,
    description: 'Tender chicken bites coated in crunchy breadcrumbs served with garlic mayo and ketchup.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80'
  },

  // MEALS
  {
    id: 'm1',
    name: 'Campus Deluxe Veg Thali',
    category: 'meals',
    price: 120,
    prepTime: '8 mins',
    tag: 'Full Value',
    isVeg: true,
    description: 'Paneer Butter Masala, Dal Tadka, Jeera Rice, 2 Butter Rotis, Cucumber Salad & Gulab Jamun.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm2',
    name: 'Spicy Schezwan Fried Rice',
    category: 'meals',
    price: 85,
    prepTime: '7 mins',
    tag: 'Spicy Delight',
    isVeg: true,
    description: 'Wok-tossed long-grain rice with broccoli, carrots, capsicum in fiery Schezwan chili paste.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm3',
    name: 'Hyderabadi Chicken Biryani Bowl',
    category: 'meals',
    price: 130,
    prepTime: '5 mins',
    tag: 'Student Favorite',
    isVeg: false,
    description: 'Aromatic saffron basmati rice layered with juicy spiced chicken thigh, served with mint raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm4',
    name: 'Creamy White Sauce Penne Pasta',
    category: 'meals',
    price: 110,
    prepTime: '9 mins',
    tag: 'Italian Comfort',
    isVeg: true,
    description: 'Al dente penne in velvety garlic parmesan sauce loaded with sweet corn, olives & herbs.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80'
  },

  // BEVERAGES
  {
    id: 'v1',
    name: 'Thick Chocolate Cold Coffee',
    category: 'beverages',
    price: 45,
    prepTime: '3 mins',
    tag: 'Refresher',
    isVeg: true,
    description: 'Hand-blended creamy espresso cold coffee topped with vanilla ice cream and Hershey chocolate syrup.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v2',
    name: 'Kulhad Masala Chai (Large)',
    category: 'beverages',
    price: 20,
    prepTime: '2 mins',
    tag: 'Exam Saver',
    isVeg: true,
    description: 'Authentic clay-pot clay tea brewed with crushed ginger, fresh cardamom and lemongrass.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v3',
    name: 'Alphonso Mango Lassi',
    category: 'beverages',
    price: 40,
    prepTime: '3 mins',
    tag: 'Sweet Chill',
    isVeg: true,
    description: 'Thick sweetened churned curd infused with rich Alphonso mango pulp and saffron garnish.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v4',
    name: 'Sparkling Peach Iced Tea',
    category: 'beverages',
    price: 35,
    prepTime: '2 mins',
    tag: 'Chilled',
    isVeg: true,
    description: 'Slow-brewed black tea infused with natural peach nectar, fresh mint leaves & crushed ice.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80'
  }
];

export const CAFETERIA_COUNTERS = [
  { id: 'c1', name: 'Main Canteen - Counter 1 (Breakfast & Snacks)', waitTime: '3-5 mins' },
  { id: 'c2', name: 'Main Canteen - Counter 2 (Meals & Biryani)', waitTime: '5-8 mins' },
  { id: 'c3', name: 'Express Beverage Station', waitTime: '1-3 mins' }
];

export function generateBookingId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `QB-${randomNum}`;
}
