(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const T=[{id:"all",name:"All Items",icon:"🍽️"},{id:"breakfast",name:"Breakfast",icon:"🌅"},{id:"snacks",name:"Snacks & Quick Bites",icon:"🍕"},{id:"meals",name:"Full Meals",icon:"🍛"},{id:"beverages",name:"Beverages",icon:"🥤"}],k=[{id:"b1",name:"Classic Egg & Cheese Roll",category:"breakfast",price:45,prepTime:"5 mins",tag:"Bestseller",isVeg:!1,description:"Fluffy scrambled eggs, sharp cheddar & spicy onion wrapped in a toasted whole wheat paratha.",image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"},{id:"b2",name:"Puri Bhaji Express",category:"breakfast",price:50,prepTime:"6 mins",tag:"Hot & Fresh",isVeg:!0,description:"3 golden crisp puris served with aromatic spiced potato bhaji and tangy lemon pickle.",image:"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"},{id:"b3",name:"Triple Deck Veg Grilled Sandwich",category:"breakfast",price:55,prepTime:"7 mins",tag:"Popular",isVeg:!0,description:"Crunchy cucumber, juicy tomato, spiced potato mash, green chutney & melted mozzarella.",image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"},{id:"b4",name:"South Indian Mini Tiffin",category:"breakfast",price:60,prepTime:"4 mins",tag:"Quick Prep",isVeg:!0,description:"2 steamed fluffy idlis + 1 crispy medu vada served with steaming hot sambar and fresh coconut chutney.",image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"},{id:"s1",name:"Butter Samosa Pav Duo",category:"snacks",price:35,prepTime:"3 mins",tag:"Pocket Friendly",isVeg:!0,description:"2 hot crispy potato samosas tucked inside butter-toasted Ladi Pav with spicy garlic dry chutney.",image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"},{id:"s2",name:"Tandoori Paneer Roll Supreme",category:"snacks",price:75,prepTime:"8 mins",tag:"Chef Choice",isVeg:!0,description:"Char-grilled marinated paneer cubes tossed with bell peppers and mayo in a soft laccha paratha.",image:"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"},{id:"s3",name:"Peri-Peri Fries Basket",category:"snacks",price:60,prepTime:"5 mins",tag:"Crispy",isVeg:!0,description:"Golden extra-crisp potato fries dusted with fiery African peri-peri spice mix and cheesy dip.",image:"https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"},{id:"s4",name:"Crispy Chicken Nuggets (6 Pcs)",category:"snacks",price:90,prepTime:"6 mins",tag:"High Protein",isVeg:!1,description:"Tender chicken bites coated in crunchy breadcrumbs served with garlic mayo and ketchup.",image:"https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"},{id:"m1",name:"Campus Deluxe Veg Thali",category:"meals",price:120,prepTime:"8 mins",tag:"Full Value",isVeg:!0,description:"Paneer Butter Masala, Dal Tadka, Jeera Rice, 2 Butter Rotis, Cucumber Salad & Gulab Jamun.",image:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"},{id:"m2",name:"Spicy Schezwan Fried Rice",category:"meals",price:85,prepTime:"7 mins",tag:"Spicy Delight",isVeg:!0,description:"Wok-tossed long-grain rice with broccoli, carrots, capsicum in fiery Schezwan chili paste.",image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"},{id:"m3",name:"Hyderabadi Chicken Biryani Bowl",category:"meals",price:130,prepTime:"5 mins",tag:"Student Favorite",isVeg:!1,description:"Aromatic saffron basmati rice layered with juicy spiced chicken thigh, served with mint raita.",image:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"},{id:"m4",name:"Creamy White Sauce Penne Pasta",category:"meals",price:110,prepTime:"9 mins",tag:"Italian Comfort",isVeg:!0,description:"Al dente penne in velvety garlic parmesan sauce loaded with sweet corn, olives & herbs.",image:"https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80"},{id:"v1",name:"Thick Chocolate Cold Coffee",category:"beverages",price:45,prepTime:"3 mins",tag:"Refresher",isVeg:!0,description:"Hand-blended creamy espresso cold coffee topped with vanilla ice cream and Hershey chocolate syrup.",image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"},{id:"v2",name:"Kulhad Masala Chai (Large)",category:"beverages",price:20,prepTime:"2 mins",tag:"Exam Saver",isVeg:!0,description:"Authentic clay-pot clay tea brewed with crushed ginger, fresh cardamom and lemongrass.",image:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"},{id:"v3",name:"Alphonso Mango Lassi",category:"beverages",price:40,prepTime:"3 mins",tag:"Sweet Chill",isVeg:!0,description:"Thick sweetened churned curd infused with rich Alphonso mango pulp and saffron garnish.",image:"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"},{id:"v4",name:"Sparkling Peach Iced Tea",category:"beverages",price:35,prepTime:"2 mins",tag:"Chilled",isVeg:!0,description:"Slow-brewed black tea infused with natural peach nectar, fresh mint leaves & crushed ice.",image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"}],p=[{id:"c1",name:"Main Canteen - Counter 1 (Breakfast & Snacks)",waitTime:"3-5 mins"},{id:"c2",name:"Main Canteen - Counter 2 (Meals & Biryani)",waitTime:"5-8 mins"},{id:"c3",name:"Express Beverage Station",waitTime:"1-3 mins"}];function $(){return`QB-${Math.floor(1e3+Math.random()*9e3)}`}const e={currentView:"menu",selectedCategory:"all",searchQuery:"",vegOnly:!1,cart:{},selectedCounter:p[0].id,lastOrder:null,theme:"light"},E=document.getElementById("app");function u(){return Object.values(e.cart)}function g(){const a=u(),t=a.reduce((i,s)=>i+s.quantity,0),n=a.reduce((i,s)=>i+s.item.price*s.quantity,0);return{count:t,subtotal:n,total:n}}function w(a,t){const n=e.cart[a];if(n){const i=n.quantity+t;i<=0?delete e.cart[a]:n.quantity=i}else if(t>0){const i=k.find(s=>s.id===a);i&&(e.cart[a]={item:i,quantity:1})}r()}function S(a){delete e.cart[a],r()}function O(){const a=u();if(a.length===0)return;const t=p.find(i=>i.id===e.selectedCounter)||p[0],{total:n}=g();e.lastOrder={bookingId:$(),items:JSON.parse(JSON.stringify(a)),total:n,counter:t,createdAt:new Date().toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"}),estimatedTime:"7 mins"},e.cart={},e.currentView="receipt",r()}function V(){e.theme=e.theme==="light"?"dark":"light",document.documentElement.setAttribute("data-theme",e.theme),r()}function r(){const{count:a,total:t}=g();E.innerHTML=`
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
          <div class="step-item ${e.currentView==="menu"?"active":"completed"}">
            <div class="step-num">${e.currentView==="summary"||e.currentView==="receipt"?"✓":"1"}</div>
            <span class="step-label">Menu</span>
          </div>
          <div class="step-divider"></div>
          <div class="step-item ${e.currentView==="summary"?"active":e.currentView==="receipt"?"completed":""}">
            <div class="step-num">${e.currentView==="receipt"?"✓":"2"}</div>
            <span class="step-label">Review</span>
          </div>
          <div class="step-divider"></div>
          <div class="step-item ${e.currentView==="receipt"?"active":""}">
            <div class="step-num">3</div>
            <span class="step-label">Receipt</span>
          </div>
        </div>

        <button id="theme-toggle" class="filter-toggle-btn" title="Toggle Theme">
          ${e.theme==="light"?"🌙 Dark":"☀️ Light"}
        </button>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      ${e.currentView==="menu"?B():""}
      ${e.currentView==="summary"?I():""}
      ${e.currentView==="receipt"?M():""}
    </main>

    <!-- FLOATING CART BAR (ONLY ON MENU VIEW WHEN CART HAS ITEMS) -->
    ${e.currentView==="menu"&&a>0?`
      <div class="floating-cart-bar">
        <div class="cart-bar-info">
          <div class="cart-badge-count">${a}</div>
          <div class="cart-total-text">
            <span class="cart-total-amount">₹${t}</span>
            <span class="cart-subtext">${a} item${a>1?"s":""} in cart</span>
          </div>
        </div>
        <button id="btn-view-cart" class="view-order-btn">
          View Order & Checkout ➔
        </button>
      </div>
    `:""}
  `,A()}function B(){const a=k.filter(t=>{const n=e.selectedCategory==="all"||t.category===e.selectedCategory,i=t.name.toLowerCase().includes(e.searchQuery.toLowerCase())||t.description.toLowerCase().includes(e.searchQuery.toLowerCase()),s=!e.vegOnly||t.isVeg;return n&&i&&s});return`
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
            value="${e.searchQuery}"
          />
        </div>
        <button id="btn-veg-toggle" class="filter-toggle-btn ${e.vegOnly?"active":""}">
          🌱 ${e.vegOnly?"Veg Only ON":"Veg Only"}
        </button>
      </div>

      <!-- CATEGORY TABS -->
      <div class="categories-scroll">
        ${T.map(t=>`
          <button 
            class="cat-tab ${e.selectedCategory===t.id?"active":""}" 
            data-category="${t.id}"
          >
            <span>${t.icon}</span> ${t.name}
          </button>
        `).join("")}
      </div>
    </section>

    <!-- FOOD CARDS GRID -->
    ${a.length===0?`
      <div class="empty-cart-state">
        <div class="empty-icon">🔍</div>
        <h3>No food items found</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting your search or category filter.</p>
      </div>
    `:`
      <div class="food-grid">
        ${a.map(t=>{const n=e.cart[t.id],i=n?n.quantity:0;return`
            <div class="food-card">
              <div class="food-img-wrapper">
                <img src="${t.image}" alt="${t.name}" class="food-img" loading="lazy" />
                ${t.tag?`<div class="food-badge">⭐ ${t.tag}</div>`:""}
                <div class="food-prep">⏱️ ${t.prepTime}</div>
              </div>
              <div class="food-body">
                <div class="food-header-line">
                  <span class="food-title">${t.name}</span>
                  <span class="${t.isVeg?"veg-icon":"nonveg-icon"}" title="${t.isVeg?"Vegetarian":"Non-Vegetarian"}"></span>
                </div>
                <p class="food-desc">${t.description}</p>
                <div class="food-footer">
                  <div class="food-price">₹${t.price} <span>/ item</span></div>
                  ${i===0?`
                    <button class="add-btn" data-action="add" data-id="${t.id}">
                      + Add
                    </button>
                  `:`
                    <div class="qty-control">
                      <button class="qty-btn" data-action="dec" data-id="${t.id}">−</button>
                      <span class="qty-num">${i}</span>
                      <button class="qty-btn" data-action="inc" data-id="${t.id}">+</button>
                    </div>
                  `}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `}
  `}function I(){const a=u(),{subtotal:t,total:n}=g();return a.length===0?`
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
    `:`
    <div class="summary-container">
      <div class="summary-header">
        <button id="btn-back-menu" class="back-link-btn">← Back to Menu</button>
        <h2 class="summary-title">Order Summary</h2>
      </div>

      <div class="summary-grid">
        <!-- ITEM LIST CARD -->
        <div class="summary-card">
          <div class="card-heading">
            <span>🍱</span> Selected Food Items (${a.reduce((i,s)=>i+s.quantity,0)})
          </div>

          <div class="order-items-list">
            ${a.map(({item:i,quantity:s})=>`
              <div class="order-item-row">
                <div class="item-left">
                  <img src="${i.image}" alt="${i.name}" class="item-img-mini" />
                  <div class="item-details">
                    <span class="item-name">${i.name}</span>
                    <span class="item-unit-price">₹${i.price} each</span>
                  </div>
                </div>
                <div class="item-right">
                  <div class="qty-control">
                    <button class="qty-btn" data-action="dec" data-id="${i.id}">−</button>
                    <span class="qty-num">${s}</span>
                    <button class="qty-btn" data-action="inc" data-id="${i.id}">+</button>
                  </div>
                  <span class="item-total-price">₹${i.price*s}</span>
                  <button class="remove-item-btn" data-action="remove" data-id="${i.id}" title="Remove item">
                    🗑️
                  </button>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- PICKUP LOCATION SELECTOR -->
          <div class="counter-select-group">
            <label class="counter-label">📍 Select Cafeteria Pickup Counter:</label>
            <select id="counter-select" class="counter-select">
              ${p.map(i=>`
                <option value="${i.id}" ${e.selectedCounter===i.id?"selected":""}>
                  ${i.name} (Est: ${i.waitTime})
                </option>
              `).join("")}
            </select>
          </div>

          <!-- PRICING BREAKDOWN -->
          <div class="pricing-breakdown">
            <div class="price-row">
              <span>Item Subtotal</span>
              <span>₹${t}</span>
            </div>
            <div class="price-row">
              <span>Student Express Service Fee</span>
              <span class="free-tag">FREE (₹0)</span>
            </div>
            <div class="price-row grand-total">
              <span>Total Amount</span>
              <span style="color: var(--primary);">₹${n}</span>
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
  `}function M(){const a=e.lastOrder;return a?`
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
            <div class="booking-code-val">${a.bookingId}</div>
          </div>
        </div>

        <div class="receipt-body">
          <div class="receipt-meta">
            <div class="meta-box">
              <span>Pickup Station</span>
              <strong>${a.counter.name.split(" - ")[1]||a.counter.name}</strong>
            </div>
            <div class="meta-box">
              <span>Estimated Time</span>
              <strong>⚡ ${a.estimatedTime}</strong>
            </div>
            <div class="meta-box">
              <span>Order Date & Time</span>
              <strong>${a.createdAt}</strong>
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
            ${a.items.map(({item:t,quantity:n})=>`
              <div class="receipt-item-row">
                <span class="receipt-item-name">${t.name}</span>
                <span class="receipt-item-qty">x${n}</span>
                <span style="font-weight: 700;">₹${t.price*n}</span>
              </div>
            `).join("")}
          </div>

          <div class="receipt-total-bar">
            <span>Total Payable</span>
            <span class="amount">₹${a.total}</span>
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
  `:`
      <div class="receipt-wrapper">
        <button id="btn-return-menu" class="btn-primary">Go to Menu</button>
      </div>
    `}function A(){const a=document.getElementById("btn-brand-home");a&&(a.onclick=()=>{e.currentView="menu",r()});const t=document.getElementById("theme-toggle");t&&(t.onclick=V);const n=document.getElementById("search-input");n&&(n.oninput=c=>{e.searchQuery=c.target.value,r()});const i=document.getElementById("btn-veg-toggle");i&&(i.onclick=()=>{e.vegOnly=!e.vegOnly,r()}),document.querySelectorAll(".cat-tab").forEach(c=>{c.onclick=()=>{e.selectedCategory=c.dataset.category,r()}}),document.querySelectorAll("[data-action]").forEach(c=>{c.onclick=C=>{C.stopPropagation();const l=c.dataset.action,m=c.dataset.id;l==="add"||l==="inc"?w(m,1):l==="dec"?w(m,-1):l==="remove"&&S(m)}});const s=document.getElementById("btn-view-cart");s&&(s.onclick=()=>{e.currentView="summary",r()});const o=document.getElementById("btn-back-menu");o&&(o.onclick=()=>{e.currentView="menu",r()});const d=document.getElementById("btn-return-menu");d&&(d.onclick=()=>{e.currentView="menu",r()});const v=document.getElementById("counter-select");v&&(v.onchange=c=>{e.selectedCounter=c.target.value});const h=document.getElementById("btn-modify-order");h&&(h.onclick=()=>{e.currentView="menu",r()});const f=document.getElementById("btn-confirm-booking");f&&(f.onclick=O);const b=document.getElementById("btn-print-receipt");b&&(b.onclick=()=>{window.print()});const y=document.getElementById("btn-new-order");y&&(y.onclick=()=>{e.currentView="menu",r()})}r();
