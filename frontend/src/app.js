import { CATEGORIES, CAFETERIA_COUNTERS } from './mockData.js';
import { fetchProducts, submitOrder } from './api.js';
import './styles.css';

// APPLICATION STATE
const state = {
  currentView: 'menu', // 'menu' | 'summary' | 'receipt'
  selectedCategory: 'all',
  searchQuery: '',
  vegOnly: false,
  cart: {}, // { [itemId]: { item, quantity } }
  selectedCounter: CAFETERIA_COUNTERS[0].id,
  lastOrder: null,
  theme: 'light',
  foodItems: [],
  customerName: 'Student' // Default for now
};

// DOM ROOT
const app = document.getElementById('app');

// HELPER FUNCTIONS
function getCartItems() {
  return Object.values(state.cart);
}

function getCartTotals() {
  const items = getCartItems();
  const count = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  return { count, subtotal, total: subtotal };
}

function updateQuantity(itemId, delta) {
  const existing = state.cart[itemId];
  if (!existing) {
    if (delta > 0) {
      const item = state.foodItems.find(f => f.id === itemId);
      if (item) {
        state.cart[itemId] = { item, quantity: 1 };
      }
    }
  } else {
    const newQty = existing.quantity + delta;
    if (newQty <= 0) {
      delete state.cart[itemId];
    } else {
      existing.quantity = newQty;
    }
  }
  render();
}

function removeItem(itemId) {
  delete state.cart[itemId];
  render();
}

async function confirmBooking() {
  const items = getCartItems();
  if (items.length === 0) return;

  let customerName = state.customerName;
  if (!customerName || customerName.trim() === '' || customerName === 'Student') {
    const input = prompt("Please enter your name for the food order ticket:", "Student / Staff");
    if (input && input.trim()) {
      customerName = input.trim();
      state.customerName = customerName;
    } else {
      customerName = "Student";
    }
  }

  const counterObj = CAFETERIA_COUNTERS.find(c => c.id === state.selectedCounter) || CAFETERIA_COUNTERS[0];

  try {
    const btn = document.getElementById('btn-confirm-booking');
    if (btn) {
      btn.innerText = 'Processing Order... ⏳';
      btn.disabled = true;
    }

    const backendOrder = await submitOrder(customerName, items);
    
    state.lastOrder = {
      bookingId: backendOrder.order_token,
      items: JSON.parse(JSON.stringify(items)),
      total: backendOrder.final_total,
      counter: counterObj,
      customerName: backendOrder.customer_name || customerName,
      createdAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      estimatedTime: '5-10 mins',
      priority: backendOrder.priority,
      billId: backendOrder.bill_id
    };

    // Clear cart
    state.cart = {};
    state.currentView = 'receipt';
    render();
  } catch (err) {
    alert("Failed to place order. Please ensure the backend server is running.");
    render();
  }
}


function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  render();
}

// MAIN RENDER FUNCTION
function render() {
  const { count, total } = getCartTotals();

  app.innerHTML = `
    <!-- HEADER -->
    <header class="app-header">
      <div class="header-container">
        <a class="brand-logo" id="btn-brand-home">
          <div class="logo-badge">⚡</div>
          <div class="logo-text">
            <span class="logo-title">Quick<span>Bite</span></span>
            <span class="logo-sub">Campus Pre-Booking</span>
          </div>
        </a>

        <!-- FLOW STEPPER -->
        <div class="flow-stepper">
          <div class="step-item ${state.currentView === 'menu' ? 'active' : 'completed'}">
            <div class="step-num">${state.currentView === 'summary' || state.currentView === 'receipt' ? '✓' : '1'}</div>
            <span class="step-label">Menu</span>
          </div>
          <div class="step-divider"></div>
          <div class="step-item ${state.currentView === 'summary' ? 'active' : (state.currentView === 'receipt' ? 'completed' : '')}">
            <div class="step-num">${state.currentView === 'receipt' ? '✓' : '2'}</div>
            <span class="step-label">Review</span>
          </div>
          <div class="step-divider"></div>
          <div class="step-item ${state.currentView === 'receipt' ? 'active' : ''}">
            <div class="step-num">3</div>
            <span class="step-label">Receipt</span>
          </div>
        </div>

        <button id="theme-toggle" class="filter-toggle-btn" title="Toggle Theme">
          ${state.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      ${state.currentView === 'menu' ? renderMenuView() : ''}
      ${state.currentView === 'summary' ? renderSummaryView() : ''}
      ${state.currentView === 'receipt' ? renderReceiptView() : ''}
    </main>

    <!-- FLOATING CART BAR (ONLY ON MENU VIEW WHEN CART HAS ITEMS) -->
    ${state.currentView === 'menu' && count > 0 ? `
      <div class="floating-cart-bar">
        <div class="cart-bar-info">
          <div class="cart-badge-count">${count}</div>
          <div class="cart-total-text">
            <span class="cart-total-amount">₹${total}</span>
            <span class="cart-subtext">${count} item${count > 1 ? 's' : ''} in cart</span>
          </div>
        </div>
        <button id="btn-view-cart" class="view-order-btn">
          View Order & Checkout ➔
        </button>
      </div>
    ` : ''}
  `;

  bindEvents();
}

// 1. PAGE MENU VIEW RENDERER
function renderMenuView() {
  const filteredItems = state.foodItems.filter(item => {
    const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesVeg = !state.vegOnly || item.isVeg;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return `
    <!-- HERO BANNER -->
    <section class="welcome-banner">
      <div class="banner-text">
        <h1>Skip lines, <span>Eat fresh</span> 🍔</h1>
        <p>Pre-order from your college canteen, select quantity, get your instant Booking ID, and collect without waiting!</p>
        <div class="banner-pills">
          <span class="pill-tag">⏱️ 5-8 Min Avg Prep</span>
          <span class="pill-tag">🏷️ Student Prices</span>
          <span class="pill-tag">🎫 Express Counter</span>
        </div>
      </div>
      <div class="banner-sparkle">🍕</div>
    </section>

    <!-- CONTROLS BAR -->
    <section class="controls-section">
      <div class="search-and-filter">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            id="search-input"
            class="search-input" 
            placeholder="Search snacks, rolls, cold coffee..." 
            value="${state.searchQuery}"
          />
        </div>
        <button id="btn-veg-toggle" class="filter-toggle-btn ${state.vegOnly ? 'active' : ''}">
          🌱 ${state.vegOnly ? 'Veg Only ON' : 'Veg Only'}
        </button>
      </div>

      <!-- CATEGORY TABS -->
      <div class="categories-scroll">
        ${CATEGORIES.map(cat => `
          <button 
            class="cat-tab ${state.selectedCategory === cat.id ? 'active' : ''}" 
            data-category="${cat.id}"
          >
            <span>${cat.icon}</span> ${cat.name}
          </button>
        `).join('')}
      </div>
    </section>

    <!-- FOOD CARDS GRID -->
    ${filteredItems.length === 0 ? `
      <div class="empty-cart-state">
        <div class="empty-icon">🔍</div>
        <h3>No food items found</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting your search or category filter.</p>
      </div>
    ` : `
      <div class="food-grid">
        ${filteredItems.map(item => {
          const cartEntry = state.cart[item.id];
          const qty = cartEntry ? cartEntry.quantity : 0;

          return `
            <div class="food-card">
              <div class="food-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="food-img" loading="lazy" />
                ${item.tag ? `<div class="food-badge">⭐ ${item.tag}</div>` : ''}
                <div class="food-prep">⏱️ ${item.prepTime}</div>
              </div>
              <div class="food-body">
                <div class="food-header-line">
                  <span class="food-title">${item.name}</span>
                  <span class="${item.isVeg ? 'veg-icon' : 'nonveg-icon'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                </div>
                <p class="food-desc">${item.description}</p>
                <div class="food-footer">
                  <div class="food-price">₹${item.price} <span>/ item</span></div>
                  ${qty === 0 ? `
                    <button class="add-btn" data-action="add" data-id="${item.id}">
                      + Add
                    </button>
                  ` : `
                    <div class="qty-control">
                      <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
                      <span class="qty-num">${qty}</span>
                      <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
                    </div>
                  `}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

// 2. PAGE ORDER SUMMARY RENDERER
function renderSummaryView() {
  const items = getCartItems();
  const { subtotal, total } = getCartTotals();

  if (items.length === 0) {
    return `
      <div class="summary-container">
        <button id="btn-back-menu" class="back-link-btn">← Back to Menu</button>
        <div class="empty-cart-state" style="margin-top: 40px;">
          <div class="empty-icon">🛒</div>
          <h2>Your cart is currently empty</h2>
          <p style="color: var(--text-muted); margin: 8px 0 20px 0;">Add some delicious food from the menu to proceed.</p>
          <button id="btn-return-menu" class="btn-primary" style="max-width: 200px; margin: 0 auto;">
            Browse Food Menu
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="summary-container">
      <div class="summary-header">
        <button id="btn-back-menu" class="back-link-btn">← Back to Menu</button>
        <h2 class="summary-title">Order Summary</h2>
      </div>

      <div class="summary-grid">
        <!-- ITEM LIST CARD -->
        <div class="summary-card">
          <div class="card-heading">
            <span>🍱</span> Selected Food Items (${items.reduce((a, b) => a + b.quantity, 0)})
          </div>

          <div class="order-items-list">
            ${items.map(({ item, quantity }) => `
              <div class="order-item-row">
                <div class="item-left">
                  <img src="${item.image}" alt="${item.name}" class="item-img-mini" />
                  <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-unit-price">₹${item.price} each</span>
                  </div>
                </div>
                <div class="item-right">
                  <div class="qty-control">
                    <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
                    <span class="qty-num">${quantity}</span>
                    <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
                  </div>
                  <span class="item-total-price">₹${item.price * quantity}</span>
                  <button class="remove-item-btn" data-action="remove" data-id="${item.id}" title="Remove item">
                    🗑️
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- PICKUP LOCATION SELECTOR -->
          <div class="counter-select-group">
            <label class="counter-label">📍 Select Cafeteria Pickup Counter:</label>
            <select id="counter-select" class="counter-select">
              ${CAFETERIA_COUNTERS.map(c => `
                <option value="${c.id}" ${state.selectedCounter === c.id ? 'selected' : ''}>
                  ${c.name} (Est: ${c.waitTime})
                </option>
              `).join('')}
            </select>
          </div>

          <!-- PRICING BREAKDOWN -->
          <div class="pricing-breakdown">
            <div class="price-row">
              <span>Item Subtotal</span>
              <span>₹${subtotal}</span>
            </div>
            <div class="price-row">
              <span>Student Express Service Fee</span>
              <span class="free-tag">FREE (₹0)</span>
            </div>
            <div class="price-row grand-total">
              <span>Total Amount</span>
              <span style="color: var(--primary);">₹${total}</span>
            </div>
          </div>
        </div>

        <!-- SUMMARY ACTIONS -->
        <div class="summary-actions">
          <button id="btn-modify-order" class="btn-secondary">
            ← Modify Order
          </button>
          <button id="btn-confirm-booking" class="btn-primary">
            Confirm Booking 🎉
          </button>
        </div>
      </div>
    </div>
  `;
}

// 3. PAGE BOOKING RECEIPT RENDERER
function renderReceiptView() {
  const order = state.lastOrder;

  if (!order) {
    return `
      <div class="receipt-wrapper">
        <button id="btn-return-menu" class="btn-primary">Go to Menu</button>
      </div>
    `;
  }

  return `
    <div class="receipt-wrapper">
      <div class="success-alert">
        <span>🎉</span> Booking Confirmed Successfully!
      </div>

      <!-- CAFETERIA TICKET RECEIPT -->
      <div class="receipt-card">
        <div class="receipt-header">
          <div class="logo-title" style="font-size: 18px;">Quick<span>Bite</span> Campus Ticket</div>
          <div class="receipt-notice">Show this booking ID at the canteen counter</div>

          <div class="booking-code-badge">
            <div class="booking-code-title">YOUR BOOKING ID</div>
            <div class="booking-code-val">${order.bookingId}</div>
          </div>
        </div>

        <div class="receipt-body">
          <div class="receipt-meta">
            <div class="meta-box">
              <span>Customer Name</span>
              <strong>👤 ${order.customerName || 'Student'}</strong>
            </div>
            <div class="meta-box">
              <span>Queue Priority</span>
              <strong>#${order.priority || 1}</strong>
            </div>
            <div class="meta-box">
              <span>Pickup Station</span>
              <strong>${order.counter.name.split(' - ')[1] || order.counter.name}</strong>
            </div>
            <div class="meta-box">
              <span>Estimated Time</span>
              <strong>⚡ ${order.estimatedTime}</strong>
            </div>
            <div class="meta-box">
              <span>Order Date & Time</span>
              <strong>${order.createdAt}</strong>
            </div>
            <div class="meta-box">
              <span>Payment Status</span>
              <strong style="color: var(--secondary);">Pay at Counter</strong>
            </div>
          </div>


          <div class="receipt-items-list">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">
              Ordered Food Items
            </div>
            ${order.items.map(({ item, quantity }) => `
              <div class="receipt-item-row">
                <span class="receipt-item-name">${item.name}</span>
                <span class="receipt-item-qty">x${quantity}</span>
                <span style="font-weight: 700;">₹${item.price * quantity}</span>
              </div>
            `).join('')}
          </div>

          <div class="receipt-total-bar">
            <span>Total Payable</span>
            <span class="amount">₹${order.total}</span>
          </div>

          <!-- MOCK BARCODE / QR FOR COUNTER -->
          <div class="receipt-footer-graphic">
            <div class="qr-code-placeholder">
              <svg viewBox="0 0 100 100">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,40 h20 v20 h-20 z M40,10 h20 v10 h-20 z M70,40 h10 v20 h-10 z M10,40 h20 v10 h-20 z M70,70 h20 v20 h-20 z M40,70 h20 v10 h-20 z" fill="#0F172A"/>
              </svg>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); font-weight: 600;">
              Counter Scanner QR Code • Ready for express pickup
            </p>
          </div>
        </div>
      </div>

      <div class="receipt-actions">
        <button id="btn-print-receipt" class="btn-secondary">
          🖨️ Print Ticket
        </button>
        <button id="btn-new-order" class="btn-primary">
          + Book Another Meal
        </button>
      </div>
    </div>
  `;
}

// BIND DOM EVENT LISTENERS
function bindEvents() {
  // Brand logo / Home click
  const brandHome = document.getElementById('btn-brand-home');
  if (brandHome) {
    brandHome.onclick = () => {
      state.currentView = 'menu';
      render();
    };
  }

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.onclick = toggleTheme;
  }

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      state.searchQuery = e.target.value;
      render();
    };
  }

  // Veg toggle
  const vegToggle = document.getElementById('btn-veg-toggle');
  if (vegToggle) {
    vegToggle.onclick = () => {
      state.vegOnly = !state.vegOnly;
      render();
    };
  }

  // Category tabs
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.onclick = () => {
      state.selectedCategory = tab.dataset.category;
      render();
    };
  });

  // Quantity & Add button delegation
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const itemId = btn.dataset.id;
      if (action === 'add' || action === 'inc') {
        updateQuantity(itemId, 1);
      } else if (action === 'dec') {
        updateQuantity(itemId, -1);
      } else if (action === 'remove') {
        removeItem(itemId);
      }
    };
  });

  // Floating View Order Cart button
  const btnViewCart = document.getElementById('btn-view-cart');
  if (btnViewCart) {
    btnViewCart.onclick = () => {
      state.currentView = 'summary';
      render();
    };
  }

  // Back to Menu buttons
  const btnBackMenu = document.getElementById('btn-back-menu');
  if (btnBackMenu) {
    btnBackMenu.onclick = () => {
      state.currentView = 'menu';
      render();
    };
  }

  const btnReturnMenu = document.getElementById('btn-return-menu');
  if (btnReturnMenu) {
    btnReturnMenu.onclick = () => {
      state.currentView = 'menu';
      render();
    };
  }

  // Counter dropdown select
  const counterSelect = document.getElementById('counter-select');
  if (counterSelect) {
    counterSelect.onchange = (e) => {
      state.selectedCounter = e.target.value;
    };
  }

  // Modify Order button
  const btnModifyOrder = document.getElementById('btn-modify-order');
  if (btnModifyOrder) {
    btnModifyOrder.onclick = () => {
      state.currentView = 'menu';
      render();
    };
  }

  // Confirm Booking button
  const btnConfirmBooking = document.getElementById('btn-confirm-booking');
  if (btnConfirmBooking) {
    btnConfirmBooking.onclick = confirmBooking;
  }

  // Print Receipt button
  const btnPrintReceipt = document.getElementById('btn-print-receipt');
  if (btnPrintReceipt) {
    btnPrintReceipt.onclick = () => {
      window.print();
    };
  }

  // New Order button
  const btnNewOrder = document.getElementById('btn-new-order');
  if (btnNewOrder) {
    btnNewOrder.onclick = () => {
      state.currentView = 'menu';
      render();
    };
  }
}

// INITIAL STARTUP
async function init() {
  state.foodItems = await fetchProducts();
  render();
}
init();
