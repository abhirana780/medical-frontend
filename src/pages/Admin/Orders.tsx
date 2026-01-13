import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { Eye, Truck } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/api/orders');
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const markAsDelivered = async (id: string) => {
        if (window.confirm('Mark this order as delivered?')) {
            try {
                await api.put(`/api/orders/${id}/deliver`, {}); // Empty body usually fine if backend just toggles
                fetchOrders(); // Refresh list
                alert('Order marked as delivered');
            } catch (error) {
                console.error("Error updating order", error);
                alert("Failed to update order status");
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage Orders</h1>
                <button onClick={fetchOrders} className="btn btn-outline btn-sm">Refresh</button>
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '3rem' }}><Loading /></div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: '#F8FAFC', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '1rem' }}>Order ID</th>
                                <th style={{ padding: '1rem' }}>Customer</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem' }}>Total</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>
                                        {order._id.substring(0, 10)}...
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Deleted User'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '1rem' }}>${order.totalPrice.toFixed(2)}</td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.isDelivered ? (
                                            <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Delivered</span>
                                        ) : (
                                            <span style={{ background: '#fef9c3', color: '#854d0e', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Processing</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <Link to={`/account/orders/${order._id}`} className="btn btn-outline btn-xs" title="View Details">
                                            <Eye size={16} />
                                        </Link>
                                        {!order.isDelivered && (
                                            <button
                                                onClick={() => markAsDelivered(order._id)}
                                                className="btn btn-primary btn-xs"
                                                title="Mark as Delivered"
                                            >
                                                <Truck size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center' }}>No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
