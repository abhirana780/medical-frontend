import { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

    // Mock Data for Charts (In a real app, fetch historical data from backend)
    const salesData = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 2000 },
        { name: 'Apr', sales: 2780 },
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: stats.totalSales > 0 ? stats.totalSales : 2390 },
    ];

    const entityData = [
        { name: 'Products', count: stats.productsCount || 0 },
        { name: 'Orders', count: stats.ordersCount || 0 },
        { name: 'Users', count: stats.usersCount || 0 },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>

            {/* Stats Grid */}
            <div className="admin-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}><DollarSign size={24} /></div>
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Total Sales</p>
                        <h3 className="text-2xl font-bold text-gray-800 m-0">{loading ? '...' : formatCurrency(stats.totalSales)}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}><ShoppingBag size={24} /></div>
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800 m-0">{loading ? '...' : stats.ordersCount}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#F3E8FF', color: '#9333EA' }}><Users size={24} /></div>
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Customers</p>
                        <h3 className="text-2xl font-bold text-gray-800 m-0">{loading ? '...' : stats.usersCount}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#FFF7ED', color: '#EA580C' }}><TrendingUp size={24} /></div>
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Products</p>
                        <h3 className="text-2xl font-bold text-gray-800 m-0">{loading ? '...' : stats.productsCount}</h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="admin-charts-grid">
                <div className="premium-card">
                    <div className="card-header-row">
                        <h3 className="text-lg font-bold text-gray-800 m-0">Revenue Trends</h3>
                        <select className="bg-gray-50 border border-gray-200 text-sm text-gray-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-100 outline-none hover:bg-gray-100 transition-colors cursor-pointer">
                            <option>This Year</option>
                        </select>
                    </div>
                    <div style={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value: any) => [formatCurrency(Number(value)), 'Sales']}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="premium-card">
                    <div className="card-header-row">
                        <h3 className="text-lg font-bold text-gray-800 m-0">Entity Overview</h3>
                        <button className="text-sm text-blue-500 font-medium hover:underline border-none bg-transparent cursor-pointer">View Details</button>
                    </div>
                    <div style={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={entityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                                    {entityData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={['#6366F1', '#10B981', '#F59E0B'][index % 3]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="admin-grid dashboard-split-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                {/* Recent Orders Table */}
                <div className="premium-card">
                    <div className="card-header-row">
                        <h3 className="text-lg font-bold text-gray-800 m-0">Recent Orders</h3>
                        <Link to="/admin/orders" className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors no-underline">View All</Link>
                    </div>
                    <div className="modern-table-container border-0 shadow-none">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th className="text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentOrders.map((order: any) => (
                                    <tr key={order._id}>
                                        <td className="font-mono text-xs text-gray-500">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                        <td className="font-medium">{order.user?.firstName || 'Guest'} {order.user?.lastName}</td>
                                        <td>
                                            <span className={`status-badge ${order.isDelivered ? 'delivered' : 'pending'}`}>
                                                {order.isDelivered ? 'Delivered' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="text-right font-semibold text-gray-700">{formatCurrency(order.totalPrice)}</td>
                                    </tr>
                                ))}
                                {!loading && stats.recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-gray-400">No orders yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Quick Stats & Alerts */}
                <div className="flex flex-col gap-6">
                    {/* Low Stock Alert */}
                    {/* Low Stock Alert */}
                    {stats.lowStockCount > 0 && (
                        <div className="premium-card" style={{ borderColor: '#FECACA', background: '#FEF2F2' }}>
                            <div className="flex items-center gap-3 mb-4 text-red-700">
                                <AlertTriangle size={24} />
                                <h3 className="font-bold text-lg m-0">Low Stock Alert</h3>
                            </div>
                            <p className="text-red-700 mb-4 text-sm">
                                There are <strong>{stats.lowStockCount}</strong> products with stock level below 10.
                            </p>

                            <div className="modern-table-container " style={{ border: '1px solid #FECACA', borderRadius: '8px', overflow: 'hidden' }}>
                                <table className="modern-table">
                                    <thead style={{ background: '#FEE2E2' }}>
                                        <tr>
                                            <th style={{ color: '#991B1B', padding: '0.75rem 1rem' }}>Product Name</th>
                                            <th style={{ color: '#991B1B', padding: '0.75rem 1rem', textAlign: 'right' }}>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {stats.lowStockProducts.map((p: any) => (
                                            <tr key={p._id} style={{ borderBottom: '1px solid #FECACA' }}>
                                                <td style={{ padding: '0.75rem 1rem', color: '#1F2937' }}>{p.name}</td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 'bold', color: '#DC2626' }}>{p.countInStock}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Link to="/admin/inventory" className="text-red-700 font-bold hover:underline text-sm flex items-center gap-1 mt-4">
                                Manage Inventory &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
