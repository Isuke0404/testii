// Product Data
const products = [
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        category: "rings",
        price: 1299.99,
        image: "💍"
    },
    {
        id: 2,
        name: "Gold Classic Ring",
        category: "rings",
        price: 599.99,
        image: "💍"
    },
    {
        id: 3,
        name: "Platinum Wedding Ring",
        category: "rings",
        price: 899.99,
        image: "💍"
    },
    {
        id: 4,
        name: "Rose Gold Band Ring",
        category: "rings",
        price: 449.99,
        image: "💍"
    },
    {
        id: 5,
        name: "Pearl Drop Necklace",
        category: "necklaces",
        price: 799.99,
        image: "📿"
    },
    {
        id: 6,
        name: "Gold Chain Necklace",
        category: "necklaces",
        price: 649.99,
        image: "📿"
    },
    {
        id: 7,
        name: "Diamond Pendant Necklace",
        category: "necklaces",
        price: 1499.99,
        image: "📿"
    },
    {
        id: 8,
        name: "Silver Lariat Necklace",
        category: "necklaces",
        price: 399.99,
        image: "📿"
    },
    {
        id: 9,
        name: "Crystal Choker Necklace",
        category: "necklaces",
        price: 299.99,
        image: "📿"
    },
    {
        id: 10,
        name: "Diamond Stud Earrings",
        category: "earrings",
        price: 899.99,
        image: "💎"
    },
    {
        id: 11,
        name: "Gold Hoop Earrings",
        category: "earrings",
        price: 349.99,
        image: "💎"
    },
    {
        id: 12,
        name: "Pearl Drop Earrings",
        category: "earrings",
        price: 549.99,
        image: "💎"
    },
    {
        id: 13,
        name: "Silver Dangle Earrings",
        category: "earrings",
        price: 249.99,
        image: "💎"
    },
    {
        id: 14,
        name: "Gold Tennis Bracelet",
        category: "bracelets",
        price: 1199.99,
        image: "✨"
    },
    {
        id: 15,
        name: "Charm Bracelet",
        category: "bracelets",
        price: 449.99,
        image: "✨"
    },
    {
        id: 16,
        name: "Bangle Set",
        category: "bracelets",
        price: 299.99,
        image: "✨"
    }
];

// Cart State
let cart = [];
let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize
function init() {
    renderProducts();
    loadCart();
    updateCartUI();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    checkoutBtn.addEventListener('click', handleCheckout);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
}

// Render Products
function renderProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove">×</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}\n\nThis is a demo site. In a real application, you would be redirected to a payment gateway.`);
    
    cart = [];
    saveCart();
    updateCartUI();
    closeCartSidebar();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6b9d;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(255, 107, 157, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on load
init();

