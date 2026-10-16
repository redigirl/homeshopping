
const CART_KEY = 'homeShoppingCart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (error) {
    console.error('Failed to read cart:', error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadge();
}

function updateBadge() {
  const el = document.getElementById('cartCount');
  if (el) el.textContent = getCart().length;
}

function showCartMessage(message) {
  const existing = document.getElementById('cartMessage');

  if (existing) {
    existing.textContent = message;
    existing.style.display = 'block';
    existing.style.opacity = '1';
    clearTimeout(existing.hideTimer);
    existing.hideTimer = setTimeout(() => {
      existing.style.opacity = '0';
    }, 1800);
    return;
  }

  const msg = document.createElement('div');
  msg.id = 'cartMessage';
  msg.textContent = message;
  msg.style.position = 'fixed';
  msg.style.top = '50%';
  msg.style.left = '50%';
  msg.style.transform = 'translate(-50%, -50%)';
  msg.style.background = 'rgba(255,255,255,0.28)';
  msg.style.backdropFilter = 'blur(10px)';
  msg.style.webkitBackdropFilter = 'blur(10px)';
  msg.style.border = '1px solid rgba(255,255,255,0.3)';
  msg.style.color = '#2e2425';
  msg.style.padding = '14px 22px';
  msg.style.borderRadius = '18px';
  msg.style.fontSize = '0.9rem';
  msg.style.fontWeight = '600';
  msg.style.boxShadow = '0 18px 38px rgba(46,36,37,0.18)';
  msg.style.zIndex = '1000';
  msg.style.opacity = '1';
  msg.style.transition = 'opacity 0.35s ease';
  msg.hideTimer = setTimeout(() => {
    msg.style.opacity = '0';
  }, 1800);
  document.body.appendChild(msg);
}

function addToCart(id, name, price, icon) {
  const cart = getCart();
  cart.push({ id, name, price, icon });
  saveCart(cart);
  showCartMessage(name + ' added to cart');
}

function removeFromCart(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  renderCartPage();
}

function renderCartPage() {
  const list = document.getElementById('cartList');
  if (!list) return;

  const cart = getCart();

  if (cart.length === 0) {
    list.innerHTML = '<div class="empty">Your cart is empty. Visit the Shop to add items.</div>';
    return;
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  list.innerHTML = cart.map((p, i) => `
    <div class="cart-item">
      <span>${p.icon} ${p.name} — $${p.price}</span>
      <button onclick="removeFromCart(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1rem;">✕</button>
    </div>
  `).join('') + `<div class="cart-item" style="border:none;font-weight:700;">Total: $${total}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
  renderCartPage();
});