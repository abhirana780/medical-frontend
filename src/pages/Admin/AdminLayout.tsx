import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, FileText, MessageSquare, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    if (isLoading) return null;
    if (!user || !user.isAdmin) return <Navigate to="/" replace />;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '30px', height: '30px', background: 'var(--primary)', borderRadius: '6px' }}></div>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>MedPlus Admin</span>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className={`admin-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/products" className={`admin-nav-item ${isActive('/admin/products') ? 'active' : ''}`}>
                        <Package size={20} /> Products
                    </Link>
                    <Link to="/admin/orders" className={`admin-nav-item ${isActive('/admin/orders') ? 'active' : ''}`}>
                        <ShoppingBag size={20} /> Orders
                    </Link>
                    <Link to="/admin/users" className={`admin-nav-item ${isActive('/admin/users') ? 'active' : ''}`}>
                        <Users size={20} /> Customers
                    </Link>
                    <Link to="/admin/prescriptions" className={`admin-nav-item ${isActive('/admin/prescriptions') ? 'active' : ''}`}>
                        <FileText size={20} /> Prescriptions
                    </Link>
                    <Link to="/admin/inquiries" className={`admin-nav-item ${isActive('/admin/inquiries') ? 'active' : ''}`}>
                        <MessageSquare size={20} /> Inquiries
                    </Link>
                    <Link to="/admin/coupons" className={`admin-nav-item ${isActive('/admin/coupons') ? 'active' : ''}`}>
                        <Tag size={20} /> Coupons
                    </Link>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <Link to="/login" className="admin-nav-item" style={{ color: '#EF4444' }}>
                        <LogOut size={20} /> Logout
                    </Link>
                </div>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
