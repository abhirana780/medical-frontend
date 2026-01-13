import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Phone, ChevronDown, Heart, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/categories';
import './Header.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    const toggleSubMenu = (menu: any) => {
        setOpenSubMenu(openSubMenu === menu ? null : menu);
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="header">
            {/* Top Bar */}
            <div className="header-top-bar">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={14} className="text-primary-light" />
                            <span>473-440-7030</span>
                        </span>
                        <span className="hidden-mobile">Private Pay & Health-Insurance Accepted</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {user ? (
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                                >
                                    <User size={16} />
                                    Hi, {user.name?.split(' ')[0]}
                                    <ChevronDown size={14} />
                                </button>
                                {userMenuOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        background: 'white',
                                        color: '#333',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        borderRadius: '0.5rem',
                                        padding: '0.5rem',
                                        minWidth: '180px',
                                        zIndex: 100,
                                        marginTop: '0.5rem'
                                    }}>
                                        <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee', fontWeight: 600, fontSize: '0.9rem' }}>
                                            {user.email}
                                        </div>
                                        {user.isAdmin && (
                                            <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setUserMenuOpen(false)} style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
                                                <LayoutDashboard size={16} /> Admin Panel
                                            </Link>
                                        )}
                                        <Link to="/account" className="dropdown-item" onClick={() => setUserMenuOpen(false)} style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
                                            <User size={16} /> My Account
                                        </Link>
                                        <button onClick={handleLogout} className="dropdown-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">Log in / Create Account</Link>
                        )}
                        <span style={{ opacity: 0.5 }}>|</span>
                        <span>USD</span>
                        <Link to="/checkout">Check Out</Link>
                    </div>
                </div>
            </div>

            {/* Main Header Content */}
            <div className="container header-main">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" className="logo">
                        <span className="logo-main">Scott's</span>
                        <span className="logo-sub">Medical Supply</span>
                    </Link>

                    <div className="search-container">
                        <form className="search-bar" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search products (e.g. Wheelchair, Gloves)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="header-actions">
                        <Link to="/account/wishlist" className="icon-btn">
                            <Heart size={24} strokeWidth={1.5} />
                        </Link>
                        <Link to="/cart" className="icon-btn">
                            <ShoppingCart size={24} strokeWidth={1.5} />
                            <span className="cart-badge">{cartCount}</span>
                        </Link>
                        <button className="icon-btn mobile-only" onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="nav-bar">
                <div className="container">
                    <nav className="nav-container">
                        <Link to="/" className="nav-link">Home</Link>

                        {CATEGORIES.map((cat, index) => (
                            <div className="nav-item-wrapper mega-menu-wrapper" key={index}>
                                <Link to={`/catalog?cat=${cat.name}`} className="nav-link">
                                    {cat.name} <ChevronDown size={14} style={{ marginTop: 2 }} />
                                </Link>
                                <div className={`dropdown-menu mega-menu cols-4`}>
                                    <div>
                                        <div className="dropdown-section-title">Shop {cat.name}</div>
                                        {cat.subcategories.map(sub => (
                                            <Link key={sub} to={`/catalog?search=${sub}`} className="dropdown-item">{sub}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link to="/services" className="nav-link">Services</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <div className="mobile-menu-drawer" onClick={e => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                        <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Menu</span>
                        <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none' }}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="mobile-nav-list">
                        <Link to="/" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>

                        <div className="mobile-nav-group">
                            <div className="mobile-nav-item mobile-dropdown-header" onClick={() => toggleSubMenu('covid')}>
                                COVID-19 PPE <ChevronDown size={16} transform={openSubMenu === 'covid' ? 'rotate(180)' : ''} />
                            </div>
                            <div className={`mobile-sub-menu ${openSubMenu === 'covid' ? 'open' : ''}`}>
                                <Link to="/catalog?search=Individual PPE" className="mobile-sub-item" onClick={() => setMobileMenuOpen(false)}>Individual PPE</Link>
                                <Link to="/catalog?search=Family PPE" className="mobile-sub-item" onClick={() => setMobileMenuOpen(false)}>Family PPE</Link>
                            </div>
                        </div>

                        <div className="mobile-nav-group">
                            <div className="mobile-nav-item mobile-dropdown-header" onClick={() => toggleSubMenu('patients')}>
                                Patients <ChevronDown size={16} transform={openSubMenu === 'patients' ? 'rotate(180)' : ''} />
                            </div>
                            <div className={`mobile-sub-menu ${openSubMenu === 'patients' ? 'open' : ''}`}>
                                <Link to="/catalog?cat=patients" className="mobile-sub-item" onClick={() => setMobileMenuOpen(false)}>See All Patients</Link>
                                <Link to="/catalog?search=Bedroom" className="mobile-sub-item" onClick={() => setMobileMenuOpen(false)}>Bedroom Aids</Link>
                                <Link to="/catalog?search=Bathroom" className="mobile-sub-item" onClick={() => setMobileMenuOpen(false)}>Bathroom Aids</Link>
                            </div>
                        </div>

                        <Link to="/catalog" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Full Catalog</Link>
                        <Link to="/services" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                        <Link to="/contact" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                        <div style={{ borderTop: '1px solid #e2e8f0', margin: '1rem 0' }}></div>
                        <Link to="/login" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
