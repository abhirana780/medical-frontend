import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, Bell, Settings, LogOut, FileText, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const UserDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        // Fallback just in case, though protected route should handle this
        return null;
    }

    // if (user.isAdmin) {
    //     return <Navigate to="/admin/dashboard" replace />;
    // }

    return (
        <div className="section dashboard-container">
            <div className="container dashboard-layout">
                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <div className="user-profile-summary">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                            alt="User"
                            className="user-avatar"
                        />
                        <div className="user-info">
                            <span>Hello,</span>
                            <h4>{user.name}</h4>
                        </div>
                    </div>

                    <ul className="dash-menu">
                        {user.isAdmin && (
                            <li style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                                <Link to="/admin/dashboard" style={{ color: '#2563eb', fontWeight: 600, background: '#eff6ff' }}>
                                    <LayoutDashboard size={18} /> Admin Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/account/profile" className={isActive('/account/profile') ? 'active' : ''}>
                                <User size={18} /> Personal Information
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/medical-history" className={isActive('/account/medical-history') ? 'active' : ''}>
                                <FileText size={18} /> Medical History
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/orders" className={isActive('/account/orders') ? 'active' : ''}>
                                <Package size={18} /> My Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/wishlist" className={isActive('/account/wishlist') ? 'active' : ''}>
                                <Heart size={18} /> My Wishlist
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/addresses" className={isActive('/account/addresses') ? 'active' : ''}>
                                <MapPin size={18} /> Manage Addresses
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/cards" className={isActive('/account/cards') ? 'active' : ''}>
                                <CreditCard size={18} /> Saved Cards
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/notifications" className={isActive('/account/notifications') ? 'active' : ''}>
                                <Bell size={18} /> Notifications
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/settings" className={isActive('/account/settings') ? 'active' : ''}>
                                <Settings size={18} /> Settings
                            </Link>
                        </li>
                        <li style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem' }}>
                                <LogOut size={18} /> Logout
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
