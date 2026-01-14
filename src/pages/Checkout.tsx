import { useState, useEffect } from 'react';
import { Lock, CreditCard, Truck, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Checkout.css';

// Stripe Imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [shippingMethod, setShippingMethod] = useState('flat-rate');
    const [isProcessing, setIsProcessing] = useState(false);

    // Stripe State
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');

    // Saved Addresses
    const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            api.get('/api/auth/profile').then(res => {
                if (res.data.addresses) setSavedAddresses(res.data.addresses);
            }).catch(err => console.error(err));
        }
    }, [user]);

    const handleSelectAddress = (addr: any) => {
        setFormData(prev => ({
            ...prev,
            address: addr.street,
            city: addr.city,
            country: addr.country,
            postalCode: addr.postalCode,
        }));
    };

    // Form State
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', company: '', country: 'Grenada',
        address: '', apartment: '', city: '', postalCode: '', phone: ''
    });

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, percent: number } | null>(null);

    // Shipping Logic
    const shippingCost = cartTotal > 300 ? 0 : 25.00;
    const finalTotal = cartTotal + shippingCost - discount;

    /*
    useEffect(() => {
        // Fetch Stripe Config
        api.get('/api/payment/config').then(async (r) => {
            const { publishableKey } = r.data;
            setStripePromise(loadStripe(publishableKey));
        }).catch(e => console.error("Stripe config error", e));
    }, []);

    useEffect(() => {
        // Create PaymentIntent when total changes or component loads
        if (finalTotal > 0) {
            api.post('/api/payment/create-payment-intent', {
                amount: Math.round(finalTotal * 100), // cents
                currency: 'usd'
            }).then(r => {
                setClientSecret(r.data.clientSecret);
            }).catch(e => console.error("Create PaymentIntent Error", e));
        }
    }, [finalTotal]);
    */


    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        try {
            const { data } = await api.post('/api/coupons/validate', { code: couponCode });
            const discountAmount = (cartTotal * data.discountPercentage) / 100;
            setDiscount(discountAmount);
            setAppliedCoupon({ code: data.code, percent: data.discountPercentage });
            alert(`Coupon Applied: ${data.discountPercentage}% OFF`);
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Invalid Coupon');
            setDiscount(0);
            setAppliedCoupon(null);
        }
    };

    // Called after successful Stripe Payment or for COD/Other
    const finalizeOrder = async (paymentDetails: any = {}) => {
        setIsProcessing(true);
        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    qty: item.quantity
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode || 'N/A',
                    country: formData.country
                },
                paymentMethod,
                paymentResult: paymentDetails, // Store Stripe ID here
                itemsPrice: cartTotal,
                shippingPrice: shippingCost,
                discountAmount: discount,
                couponCode: appliedCoupon?.code,
                totalPrice: finalTotal,
                isPaid: paymentMethod === 'credit-card',
                paidAt: paymentMethod === 'credit-card' ? new Date() : null
            };

            const { data } = await api.post('/api/orders', orderData);
            clearCart();
            navigate(`/account/orders/${data._id}`);

        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.message || error.message || "Error placing order. Please try again.";
            alert(msg);
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to place an order");
            navigate('/login');
            return;
        }
        // If Credit Card, the PaymentForm handles the submission.
        // If COD or Paypal, we submit here.
        // MOCK: Allow credit-card to submit directly without Stripe for now
        finalizeOrder();
        /*
        if (paymentMethod !== 'credit-card') {
            finalizeOrder();
        }
        */
    };

    if (cart.length === 0) {
        return (
            <div className="section container text-center" style={{ padding: '4rem 0' }}>
                <h2 className="mb-4">Your cart is empty</h2>
                <p className="mb-8 color-muted">Add some medical supplies to your cart before checking out.</p>
                <Link to="/catalog" className="btn btn-primary">Browse Catalog</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page section">
            <div className="container">
                <Link to="/cart" className="back-link mb-4 inline-flex items-center text-sm color-muted hover:text-primary">
                    <ChevronLeft size={16} className="mr-1" /> Return to Cart
                </Link>
                <h1 className="page-title">Checkout</h1>

                <div className="checkout-grid">
                    {/* Left Column: Forms */}
                    <div className="checkout-forms">

                        {/* Billing Details */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <Lock size={18} /> <span>Billing Details</span>
                            </div>
                            <div className="section-body">
                                {savedAddresses.length > 0 && (
                                    <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#334155' }}>Use a Saved Address</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                                            {savedAddresses.map((addr, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => handleSelectAddress(addr)}
                                                    style={{
                                                        padding: '0.75rem',
                                                        border: '1px solid #cbd5e1',
                                                        borderRadius: '0.25rem',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem',
                                                        background: '#f8fafc'
                                                    }}
                                                >
                                                    <div style={{ fontWeight: 600 }}>{addr.city}</div>
                                                    <div style={{ color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{addr.street}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name*</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name*</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company (optional)" />
                                </div>
                                <div className="form-group">
                                    <label>Country / Region*</label>
                                    <select name="country" value={formData.country} onChange={handleInputChange}>
                                        <option value="Grenada">Grenada</option>
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Street Address*</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="House number and street name" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment, suite, unit, etc. (optional)" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Parish / City*</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Town / City" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Postal Code</label>
                                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code (optional)" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Phone*</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Method */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <Truck size={18} /> <span>Shipping Method</span>
                            </div>
                            <div className="section-body">
                                <div className="radio-list">
                                    <label className={`radio-card ${shippingMethod === 'flat-rate' ? 'selected' : ''}`}>
                                        <div className="radio-left">
                                            <input type="radio" name="shipping-method" value="flat-rate" checked={shippingMethod === 'flat-rate'} onChange={(e) => setShippingMethod(e.target.value)} />
                                            <div>
                                                <strong>{shippingCost === 0 ? 'Free Shipping' : 'Standard Delivery'}</strong>
                                                <p>{shippingCost === 0 ? 'Orders over $300 qualify for free shipping' : 'Standard flat rate shipping'}</p>
                                            </div>
                                        </div>
                                        <span className="price">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <CreditCard size={18} /> <span>Payment Method</span>
                            </div>
                            <div className="section-body">
                                <div className="radio-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="radio-option">
                                        <input type="radio" name="payment" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                        Credit/Debit Card (Stripe)
                                    </label>
                                </div>

                                {paymentMethod === 'credit-card' && (
                                    <div className="credit-card-form">
                                        {/* 
                                            // STRIPE INTEGRATION COMMENTED OUT
                                            // clientSecret && stripePromise && (
                                            //     <Elements stripe={stripePromise} options={{ clientSecret }}>
                                            //         <PaymentForm amount={finalTotal} onSuccess={(paymentIntent) => finalizeOrder(paymentIntent)} />
                                            //     </Elements>
                                            // )
                                        */}
                                        <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
                                            Payment Gateway is currently disabled for development. Proceeding will create a mock order.
                                        </div>
                                        <div className="icons" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                            <div style={{ background: '#eee', padding: '2px 5px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>VISA</div>
                                            <div style={{ background: '#eee', padding: '2px 5px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>MC</div>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" placeholder="Card number (Mock)" disabled />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" placeholder="Name on card" />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <input type="text" placeholder="Expiration date (MM/YY)" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Security Code" />
                                            </div>
                                        </div>

                                        <button onClick={handlePlaceOrder} disabled={isProcessing} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>
                                            {isProcessing ? 'Processing Order...' : `Pay $${finalTotal.toFixed(2)}`}
                                        </button>
                                    </div>
                                )}

                                {/* 
                                {paymentMethod === 'credit-card' && !clientSecret && (
                                    <p>Loading Payment...</p>
                                )}
                                */}

                                <div className="radio-group" style={{ marginTop: '1.5rem' }}>
                                    <label className="radio-option">
                                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                        Cash on delivery (Grenada only)
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                        Paypal
                                    </label>
                                </div>

                                {paymentMethod !== 'credit-card' && (
                                    <button onClick={handlePlaceOrder} disabled={isProcessing} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>
                                        {isProcessing ? 'Processing Order...' : `Place Order ($${finalTotal.toFixed(2)})`}
                                    </button>
                                )}

                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="order-summary-col">
                        <div className="order-summary-card">
                            <h3>Order summary</h3>
                            <div className="summary-items">
                                {cart.map((item, i) => (
                                    <div key={i} className="summary-item">
                                        <div className="item-img">
                                            <img src={item.image} alt={item.name} onError={(e: any) => e.target.src = 'https://via.placeholder.com/60'} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            <span className="qty-badge">{item.quantity}</span>
                                        </div>
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="coupon-box" style={{ margin: '1rem 0', display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    style={{ background: '#333', color: 'white', border: 'none', padding: '0 1rem', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Apply
                                </button>
                            </div>

                            <hr className="divider" />

                            <div className="summary-totals">
                                <div className="row">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="row">
                                        <span>Discount</span>
                                        <span style={{ color: 'green' }}>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="row">
                                    <span>Shipping</span>
                                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                                </div>
                                <div className="row">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                                <hr className="divider" />
                                <div className="row total">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
