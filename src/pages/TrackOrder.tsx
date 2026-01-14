import React, { useState } from 'react';
import { Search, Package, MapPin, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import './TrackOrder.css';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await api.post('/api/orders/track', { orderId, email });
            setOrder(res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Order not found. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem' }}>
            <h1 className="text-center" style={{ marginBottom: '1rem' }}>Track Your Order</h1>
            <p className="text-center" style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Enter your Order ID (from your confirmation email) and the email address used to check out.
            </p>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleSubmit} className="track-form" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr auto' }}>
                    <div className="form-group">
                        <label>Order ID</label>
                        <input
                            type="text"
                            placeholder="e.g. 65f2..."
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                            className="form-control"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }} disabled={loading}>
                            {loading ? 'Tracking...' : <><Search size={18} style={{ marginRight: '0.5rem' }} /> Track</>}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="alert alert-error" style={{ marginTop: '2rem', background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '0.5rem' }}>
                        {error}
                    </div>
                )}

                {order && (
                    <div className="track-results" style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h3 style={{ marginBottom: '0.25rem' }}>Order Found!</h3>
                                <p style={{ color: 'var(--text-muted)' }}>ID: {order._id}</p>
                            </div>
                            <div className={`badge badge-${order.isDelivered ? 'success' : 'warning'}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                {order.status}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="timeline-horizontal">
                            <div className="timeline-item completed">
                                <div className="timeline-icon"><CheckCircle size={20} /></div>
                                <div className="timeline-content">Order Placed<br /><small>{new Date(order.createdAt).toLocaleDateString()}</small></div>
                            </div>
                            <div className={`timeline-item ${order.isPaid ? 'completed' : 'active'}`}>
                                <div className="timeline-icon"><Package size={20} /></div>
                                <div className="timeline-content">Processing</div>
                            </div>
                            <div className={`timeline-item ${order.isDelivered ? 'completed' : ''}`}>
                                <div className="timeline-icon"><MapPin size={20} /></div>
                                <div className="timeline-content">Delivered<br />
                                    {order.isDelivered ? <small>{new Date(order.deliveredAt).toLocaleDateString()}</small> : <small>Estimated: 3-5 days</small>}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h4>Items in this Order</h4>
                            <div className="order-items-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                {order.orderItems.map((item: any, idx: number) => (
                                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{item.name}</div>
                                            <div style={{ color: 'var(--text-muted)' }}>Qty: {item.qty}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
