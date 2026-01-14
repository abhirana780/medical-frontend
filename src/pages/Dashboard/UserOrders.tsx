import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const UserOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                // Modified to fetch from /api/orders/myorders which should use user from token
                const { data } = await api.get('/api/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <div>Loading orders...</div>;

    if (orders.length === 0) {
        return (
            <div>
                <h2 className="dash-title">My Orders</h2>
                <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--light)', borderRadius: '0.5rem' }}>
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/catalog" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="dash-title">My Orders ({orders.length})</h2>

            <div className="order-list">
                {orders.map((order: any) => (
                    <div key={order._id} className="order-card-row">
                        <div className="order-info-left">
                            <div className="order-thumbs-stack" style={{ display: 'flex', gap: '0.5rem' }}>
                                {order.orderItems.slice(0, 3).map((item: any, i: number) => (
                                    <img key={i} src={item.image} alt={item.name} className="order-thumb" />
                                ))}
                                {order.orderItems.length > 3 && (
                                    <div className="order-more-thumb">+{order.orderItems.length - 3}</div>
                                )}
                            </div>
                            <div className="order-details-text">
                                <h4>Order #{order._id.substring(0, 8)}...</h4>
                                <div className="order-meta">
                                    <span>Placed on: {new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span className={`order-status status-${order.isDelivered ? 'delivered' : 'processing'}`}>
                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="order-actions-right">
                            <span className="order-total-price">${order.totalPrice.toFixed(2)}</span>
                            <Link to={`/account/orders/${order._id}`} className="btn btn-outline btn-sm">Track & Review</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrders;
