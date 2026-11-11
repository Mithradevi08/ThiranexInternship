import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, X, Plus, Minus, Trash2, Eye, CheckCircle, ShieldCheck } from 'lucide-react';

const API_BASE = 'http://localhost:5003/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('thiranex_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [activeProduct, setActiveProduct] = useState(null); // for Details modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Checkout form state
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('thiranex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        customer,
        items: cart.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        })),
        totalAmount,
        paymentMethod: 'Cash on Delivery'
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setOrderConfirmation(data.order);
        setCart([]);
        setIsCheckoutOpen(false);
        setCustomer({ name: '', email: '', phone: '', address: '' });
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      alert('Network error placing order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Top Header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <ShoppingBag size={24} />
            <span>ShopQuick</span>
          </div>

          <button onClick={() => setIsCartOpen(true)} className="cart-btn">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {totalCartCount > 0 && <span className="cart-count">{totalCartCount}</span>}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Category Filters */}
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading catalog from MongoDB Atlas...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            No products found in this category.
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div key={p._id} className="product-card">
                <img
                  src={p.image}
                  alt={p.name}
                  className="product-image"
                  onClick={() => setActiveProduct(p)}
                />
                <div className="product-body">
                  <span className="product-cat">{p.category}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-price">₹{p.price.toLocaleString()}</div>
                  <div className="card-actions">
                    <button
                      onClick={() => setActiveProduct(p)}
                      className="btn btn-outline"
                      title="View Details"
                    >
                      <Eye size={14} /> Details
                    </button>
                    <button onClick={() => addToCart(p)} className="btn btn-primary">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      {activeProduct && (
        <div className="modal-overlay" onClick={() => setActiveProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Product Details</h2>
              <button onClick={() => setActiveProduct(null)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
            />
            <span className="product-cat">{activeProduct.category}</span>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '6px 0 10px' }}>{activeProduct.name}</h3>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px' }}>{activeProduct.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div className="product-price" style={{ margin: 0 }}>₹{activeProduct.price.toLocaleString()}</div>
              <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>In Stock ({activeProduct.stock} units)</span>
            </div>
            <button
              onClick={() => {
                addToCart(activeProduct);
                setActiveProduct(null);
                setIsCartOpen(true);
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Add to Cart & View
            </button>
          </div>
        </div>
      )}

      {/* Cart Sidebar / Drawer */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <ShoppingCart size={20} />
                <span>Your Cart ({totalCartCount})</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', marginTop: '60px' }}>
                  <ShoppingCart size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item._id, -1)} className="qty-btn">
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="qty-btn">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span style={{ color: '#059669' }}>₹{totalAmount.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Checkout & Shipping</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Mithradevi Rajalingam"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  rows={2}
                  required
                  className="form-textarea"
                  placeholder="Flat/House No., Street, City, Pincode"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>

              <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#475569', marginBottom: '4px' }}>Payment Method:</div>
                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} color="#059669" /> Cash on Delivery (COD) / Demo Pay
                </div>
              </div>

              <div className="total-row" style={{ fontSize: '18px' }}>
                <span>Order Total:</span>
                <span style={{ color: '#059669' }}>₹{totalAmount.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderConfirmation && (
        <div className="modal-overlay" onClick={() => setOrderConfirmation(null)}>
          <div className="modal-content" style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <CheckCircle size={56} color="#16a34a" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Order Placed Successfully!</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
              Thank you, <strong>{orderConfirmation.customer.name}</strong>. Your order has been registered in MongoDB Atlas.
            </p>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>ORDER ID</div>
              <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '13px', marginBottom: '10px' }}>
                {orderConfirmation._id}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>DELIVERY TO</div>
              <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '10px' }}>
                {orderConfirmation.customer.address}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>TOTAL AMOUNT</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#059669' }}>
                ₹{orderConfirmation.totalAmount.toLocaleString()} (Cash on Delivery)
              </div>
            </div>
            <button
              onClick={() => setOrderConfirmation(null)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
