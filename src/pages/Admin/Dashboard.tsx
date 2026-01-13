import { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>({
        totalSales: 0,
        ordersCount: 0,
        usersCount: 0,
        productsCount: 0,
        recentOrders: [],
        lowStockCount: 0,
        lowStockProducts: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/api/analytics/dashboard');
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div>
            <h1 className="mb-8">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid-cols-4" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}><DollarSign /></div>
                    <div>
                        <p className="text-muted" style={{ margin: 0 }}>Total Sales</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{loading ? '...' : formatCurrency(stats.totalSales)}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}><ShoppingBag /></div>
                    <div>
                        <p className="text-muted" style={{ margin: 0 }}>Total Orders</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{loading ? '...' : stats.ordersCount}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#F3E8FF', color: '#9333EA' }}><Users /></div>
                    <div>
                        <p className="text-muted" style={{ margin: 0 }}>Customers</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{loading ? '...' : stats.usersCount}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#FFF7ED', color: '#EA580C' }}><TrendingUp /></div>
                    <div>
                        <p className="text-muted" style={{ margin: 0 }}>Products</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{loading ? '...' : stats.productsCount}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders Table */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3>Recent Orders</h3>
                        <Link to="/admin/orders" style={{ color: 'var(--primary)', fontWeight: 500 }}>View All</Link>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <th style={{ paddingBottom: '1rem' }}>Order ID</th>
                                <th style={{ paddingBottom: '1rem' }}>Customer</th>
                                <th style={{ paddingBottom: '1rem' }}>Status</th>
                                <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.map((order: any) => (
                                <tr key={order._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem 0' }}>#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                    <td style={{ padding: '1rem 0' }}>{order.user?.firstName || 'Guest'} {order.user?.lastName}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span className={`status-badge ${!order.isDelivered ? 'pending' : 'delivered'}`}>
                                            {order.isDelivered ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0', textAlign: 'right' }}>{formatCurrency(order.totalPrice)}</td>
                                </tr>
                            ))}
                            {!loading && stats.recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>No orders yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Right Column: Quick Stats & Alerts */}
                <div className="flex flex-col gap-6">
                    {/* Low Stock Alert */}
                    {stats.lowStockCount > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4 text-red-700">
                                <AlertTriangle size={24} />
                                <h3 className="font-bold text-lg m-0">Low Stock Alert</h3>
                            </div>
                            <p className="text-red-600 mb-4">
                                There are <strong>{stats.lowStockCount}</strong> products with stock level below 10.
                            </p>
                            <ul className="mb-4 space-y-2">
                                {stats.lowStockProducts.map((p: any) => (
                                    <li key={p._id} className="flex justify-between text-sm text-red-800 bg-white p-2 rounded border border-red-100">
                                        <span>{p.name}</span>
                                        <span className="font-bold">{p.countInStock} left</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/admin/products" className="text-red-700 font-semibold hover:underline text-sm">
                                Manage Inventory &rarr;
                            </Link>
                        </div>
                    )}

                    {/* Quick Link Stats */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <h3 className="mb-4">Quick Stats</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/admin/products" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                                <span style={{ fontWeight: 500 }}>Total Products</span>
                                <span style={{ fontWeight: 700, color: '#3B82F6' }}>{stats.productsCount}</span>
                            </Link>
                            <Link to="/admin/orders" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                                <span style={{ fontWeight: 500 }}>Total Orders</span>
                                <span style={{ fontWeight: 700, color: '#F59E0B' }}>{stats.ordersCount}</span>
                            </Link>
                            <Link to="/admin/users" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                                <span style={{ fontWeight: 500 }}>Total Customers</span>
                                <span style={{ fontWeight: 700, color: '#10B981' }}>{stats.usersCount}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
