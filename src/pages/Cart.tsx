import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    // Recommended items (can remain static or be fetched)
    const recommended = [
        { name: "L'Oreal Paris Revitalift", price: 15.45, rating: 4.5, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200" },
        { name: "Venus HD Matte Liquid", price: 12.45, rating: 4.8, img: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=200" },
        { name: "Rosemary Essential Oil", price: 9.45, rating: 4.7, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=200" },
        { name: "Face Glow Oil for Normal", price: 10.45, rating: 4.6, img: "https://images.unsplash.com/photo-1616686656755-27f32ba53a80?q=80&w=200" }
    ];

    const shippingCost = cartTotal > 300 ? 0 : 25; // Free shipping over $300
    const finalTotal = cartTotal + shippingCost;

    if (cart.length === 0) {
        return (
            <div className="cart-page section center-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container text-center">
                    <h1 className="page-title">Your Cart is Empty</h1>
                    <p className="mb-8" style={{ color: '#64748B', margin: '1rem 0 2rem' }}>Looks like you haven't added anything yet.</p>
                    <Link to="/catalog" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page section">
            <div className="container">
                <h1 className="page-title">Cart ({cart.length} items)</h1>

                <div className="cart-layout">
                    {/* Left Column: Items */}
                    <div className="cart-main">
                        <div className="cart-list-header">
                            <h3>{cart.length} items in your cart</h3>
                        </div>

                        {/* Active Cart Items */}
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item._id} className="cart-item">
                                    <div className="item-img-box">
                                        <img src={item.image} alt={item.name} onError={(e: any) => e.target.src = 'https://via.placeholder.com/80'} />
                                    </div>
                                    <div className="item-details">
                                        <span className="brand">Product</span>
                                        <h4><Link to={`/product/${item._id}`}>{item.name}</Link></h4>
                                        <span className="stock-status">✓ In stock</span>
                                        <div className="item-actions">
                                            <button className="text-btn text-red" onClick={() => removeFromCart(item._id)}>
                                                <Trash2 size={14} /> Remove
                                            </button>
                                            <button className="text-btn text-blue">
                                                <Heart size={14} /> Save for later
                                            </button>
                                        </div>
                                    </div>
                                    <div className="item-right">
                                        <div className="qty-control">
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><Plus size={14} /></button>
                                        </div>
                                        <div className="item-prices">
                                            <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', textAlign: 'right' }}>
                                                ${item.price.toFixed(2)} / each
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-actions-row">
                            <button className="btn btn-outline btn-pill" onClick={clearCart}>Clear Cart</button>
                            <Link to="/catalog" className="btn btn-primary btn-pill">Continue Shopping</Link>
                        </div>

                    </div>

                    {/* Right Column: Summary */}
                    <div className="cart-sidebar">
                        <div className="order-summary-box">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            {/* Tax could be added here */}

                            <hr className="divider" />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>

                            <Link to="/checkout" className="btn btn-primary btn-block checkout-btn">
                                Proceed to Checkout
                            </Link>

                            <div className="promo-code">
                                <label>Have a promo code?</label>
                                <div className="input-group-promo">
                                    <input type="text" placeholder="Enter promo code" />
                                    <button className="btn btn-primary">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended */}
                <div className="recommended-section">
                    <h3 className="text-center">Recommended with Your Order</h3>
                    <div className="rec-grid">
                        {recommended.map((rec, i) => (
                            <div key={i} className="rec-card">
                                <span className="badge-sale">-20%</span>
                                <img src={rec.img} alt={rec.name} />
                                <h4>{rec.name}</h4>
                                <div className="rec-rating">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} size={12} fill={idx < Math.floor(rec.rating) ? "#fbbf24" : "#e5e7eb"} color="none" />
                                    ))}
                                    <span>({rec.rating})</span>
                                </div>
                                <div className="rec-price">
                                    <strong>${rec.price}</strong> <small>$18.45</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;
