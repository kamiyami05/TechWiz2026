/**
 * FandomVerse - Merchandise Showcase & Temporary Shopping Cart
 * Calculates billing totals, taxes, and shipping on the client side per SRS Section 1.6.
 */

window.allMerch = [];
window.cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
  loadMerchandise();
  initCartDrawer();

  window.addEventListener('fandomCategoryChanged', (e) => {
    filterMerchandise(e.detail.category);
  });
});

async function loadMerchandise() {
  const container = document.getElementById('merch-grid');
  if (!container) return;

  try {
    const res = await fetch('data/merchandise.json');
    if (!res.ok) throw new Error('Failed to load merchandise');
    const list = await res.json();
    window.allMerch = list;
    filterMerchandise(window.currentFandomCategory || 'all');
  } catch (err) {
    console.error('Error loading merchandise:', err);
  }
}

function filterMerchandise(cat) {
  if (!window.allMerch) return;
  const filtered = cat === 'all'
    ? window.allMerch
    : window.allMerch.filter(m => m.category === cat);
  renderMerchandise(filtered);
}

function renderMerchandise(list) {
  const container = document.getElementById('merch-grid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
        No fan merchandise available for this category yet.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(m => `
    <article class="merch-card">
      <div class="merch-thumb">
        <img src="${m.image}" alt="${m.name}" loading="lazy">
      </div>
      <div class="merch-body">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--secondary); font-weight: 800; margin-bottom: 0.2rem;">
          ${m.category}
        </span>
        <h4 class="merch-title">${m.name}</h4>
        <span class="merch-price">\$${m.price.toFixed(2)}</span>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.45;">
          ${m.description}
        </p>

        <button class="btn btn-primary add-to-cart-btn" data-id="${m.id}" style="margin-top: auto; width: 100%; font-size: 0.8125rem;">
          🛍 Add to Cart
        </button>
      </div>
    </article>
  `).join('');

  // Attach Add to Cart
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = window.allMerch.find(m => m.id === id);
      if (item) addToCart(item);
    });
  });
}

function initCartDrawer() {
  const openBtn = document.getElementById('open-cart-btn');
  const drawer = document.getElementById('cart-drawer-overlay');
  const closeBtn = document.getElementById('close-cart-btn');

  if (openBtn && drawer) {
    openBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      renderCartUI();
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.remove('active');
    });
  }
}

function addToCart(item) {
  const existing = window.cartItems.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    window.cartItems.push({ ...item, quantity: 1 });
  }

  updateCartBadge();
  renderCartUI();

  // Open drawer automatically
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.add('active');
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count-badge');
  const totalQty = window.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) badge.textContent = totalQty.toString();
}

function renderCartUI() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;

  if (window.cartItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🛒</span>
        <h4 style="font-size: 1.1rem; color: #fff; font-weight: 800;">Your Cart is Empty</h4>
        <p style="font-size: 0.8125rem; margin-top: 0.25rem;">Explore official fan merch and add items to test billing!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '\$0.00';
    if (taxEl) taxEl.textContent = '\$0.00';
    if (shippingEl) shippingEl.textContent = '\$0.00';
    if (totalEl) totalEl.textContent = '\$0.00';
    return;
  }

  container.innerHTML = window.cartItems.map(item => `
    <div style="display: flex; gap: 0.75rem; align-items: center; background: #1a2238; padding: 0.75rem; border-radius: 10px; border: 1px solid var(--border-light);">
      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
      <div style="flex: 1; min-width: 0;">
        <h5 style="font-size: 0.8125rem; font-weight: 800; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${item.name}
        </h5>
        <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700;">
          \$${item.price.toFixed(2)}
        </span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.35rem;">
        <button class="cart-qty-btn" data-id="${item.id}" data-action="dec" style="width: 24px; height: 24px; border-radius: 4px; background: #253252; color: #fff; border: none; cursor: pointer;">-</button>
        <span style="font-size: 0.8125rem; font-weight: 800; padding: 0 0.3rem;">${item.quantity}</span>
        <button class="cart-qty-btn" data-id="${item.id}" data-action="inc" style="width: 24px; height: 24px; border-radius: 4px; background: #253252; color: #fff; border: none; cursor: pointer;">+</button>
      </div>
    </div>
  `).join('');

  // Attach quantity buttons
  container.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const action = btn.getAttribute('data-action');
      const item = window.cartItems.find(i => i.id === id);
      if (item) {
        if (action === 'inc') item.quantity += 1;
        if (action === 'dec') {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            window.cartItems = window.cartItems.filter(i => i.id !== id);
          }
        }
        updateCartBadge();
        renderCartUI();
      }
    });
  });

  const subtotal = window.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825; // 8.25% standard tax
  const shipping = subtotal > 0 ? 5.00 : 0.00;
  const grandTotal = subtotal + tax + shipping;

  if (subtotalEl) subtotalEl.textContent = `\$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `\$${tax.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `\$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `\$${grandTotal.toFixed(2)}`;
}
