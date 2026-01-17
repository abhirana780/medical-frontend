
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Phone, ChevronDown, Heart, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { CATEGORIES } from '../data/categories';
import toast from 'react-hot-toast';
import api from '../utils/api';
import './Header.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { currency, setCurrency, formatPrice } = useCurrency();
    const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
    const currencies = ['USD', 'XCD', 'TTD', 'EUR'];

    const handleCurrencySelect = (c: any) => {
        setCurrency(c);
        setCurrencyDropdownOpen(false);
    };

    // Smart Search State
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    // Sync state with URL
    useEffect(() => {
        if (location.pathname === '/catalog') {
            const cat = searchParams.get('cat');
            const search = searchParams.get('search');
            if (cat !== null) setSearchCategory(cat);
            else setSearchCategory('');

            if (search !== null) setSearchQuery(search);
        }
    }, [location.pathname, searchParams]);

    const handleSelectCategory = (newCat: string) => {
        setSearchCategory(newCat);

        // Immediate navigation logic
        let url = `/catalog`;
        const params = [];

        // Keep existing search query if present
        if (searchQuery.trim()) params.push(`search=${encodeURIComponent(searchQuery)}`);
        if (newCat) params.push(`cat=${encodeURIComponent(newCat)}`);

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
        navigate(url);
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (timer) clearTimeout(timer);

        if (query.length > 2) {
            const newTimer = setTimeout(async () => {
                try {
                    const { data } = await api.get(`/api/products?search=${encodeURIComponent(query)}&limit=5`);
                    setSuggestions(data.products || data); // Handle pagination response or array
                    setShowSuggestions(true);
                } catch (err) {
                    console.error("Search error", err);
                }
            }, 300); // 300ms debounce
            setTimer(newTimer);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (product: any) => {
        setSearchQuery('');
        setShowSuggestions(false);
        navigate(`/product/${product._id}`);
    };

    const toggleSubMenu = (menu: string) => {
        setOpenSubMenu(openSubMenu === menu ? null : menu);
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        setShowSuggestions(false);

        // Always redirect to catalog, defaulting to "All Products" if inputs are empty
        let url = `/catalog`;
        const params = [];
        if (searchQuery.trim()) params.push(`search=${encodeURIComponent(searchQuery)}`);
        if (searchCategory) params.push(`cat=${encodeURIComponent(searchCategory)}`);

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        navigate(url);
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        toast.success("Logged out successfully");
        navigate('/login');
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
                            <div style={{ position: 'relative', zIndex: 1001 }}>
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
                                        {!user.isAdmin && (
                                            <Link to="/account" className="dropdown-item" onClick={() => setUserMenuOpen(false)} style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
                                                <User size={16} /> My Account
                                            </Link>
                                        )}
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

                        <div className="currency-selector" ref={(node) => { if (node) node.style.setProperty('z-index', currencyDropdownOpen ? '1005' : 'auto'); }}>
                            <div
                                className="currency-trigger"
                                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                            >
                                {currency} <ChevronDown size={14} />
                            </div>
                            {currencyDropdownOpen && (
                                <>
                                    <div className="fixed-backdrop" onClick={() => setCurrencyDropdownOpen(false)}></div>
                                    <div className="currency-dropdown">
                                        {currencies.map(c => (
                                            <div
                                                key={c}
                                                className={`currency-option ${c === currency ? 'selected' : ''}`}
                                                onClick={() => handleCurrencySelect(c)}
                                            >
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
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

                    <div className="search-container" style={{ position: 'relative' }}>
                        <form className="search-bar" onSubmit={handleSearch}>
                            {/* Category Selector */}
                            {/* Category Selector */}
                            <div className="search-section" style={{ borderRight: '1px solid #e2e8f0', paddingRight: '0.5rem', marginRight: '0.5rem', position: 'relative', minWidth: '140px' }}>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#0f172a', marginBottom: '2px', paddingLeft: '4px' }}>Category</label>

                                <div
                                    className="custom-select-trigger"
                                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                                >
                                    <span style={{
                                        color: searchCategory ? '#0f172a' : '#64748b',
                                        fontWeight: 500,
                                        display: 'block',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontSize: '0.9rem'
                                    }}>
                                        {searchCategory || "All Categories"}
                                    </span>
                                    <ChevronDown size={14} className={`select-arrow ${categoryDropdownOpen ? 'rotate' : ''}`} />
                                </div>

                                {categoryDropdownOpen && (
                                    <>
                                        <div className="fixed-backdrop" onClick={() => setCategoryDropdownOpen(false)}></div>
                                        <div className="custom-dropdown-menu">
                                            <div
                                                className={`custom-option ${!searchCategory ? 'selected' : ''}`}
                                                onClick={() => { handleSelectCategory(''); setCategoryDropdownOpen(false); }}
                                            >
                                                All Categories
                                            </div>
                                            {CATEGORIES.map(cat => (
                                                <div
                                                    key={cat.name}
                                                    className={`custom-option ${searchCategory === cat.name ? 'selected' : ''}`}
                                                    onClick={() => { handleSelectCategory(cat.name); setCategoryDropdownOpen(false); }}
                                                >
                                                    {cat.name}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Search Input */}
                            <div className="search-section" style={{ flexGrow: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#0f172a', marginBottom: '2px', paddingLeft: '4px' }}>Search</label>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                                    style={{ padding: 0 }}
                                />
                            </div>

                            <button type="submit" className="search-btn">
                                <Search size={18} />
                            </button>
                        </form>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="search-suggestions" style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: 'white',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                borderRadius: '0.75rem',
                                zIndex: 50,
                                marginTop: '0.5rem',
                                border: '1px solid #e2e8f0',
                                overflow: 'hidden'
                            }}>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#f8fafc' }}>
                                    Products
                                </div>
                                {suggestions.map((product) => (
                                    <div
                                        key={product._id}
                                        className="suggestion-item"
                                        onMouseDown={() => handleSuggestionClick(product)}
                                        style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'center',
                                            padding: '0.75rem 1rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                            borderBottom: '1px solid #f1f5f9'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{ width: '40px', height: '40px', borderRadius: '0.5rem', objectFit: 'cover', background: '#f1f5f9' }}
                                            onError={(e: any) => e.target.src = 'https://via.placeholder.com/40'}
                                        />
                                        <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                                            <div style={{ fontWeight: 500, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {product.name}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                                                {formatPrice(product.price)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div
                                    className="suggestion-item"
                                    onMouseDown={handleSearch}
                                    style={{
                                        padding: '0.75rem',
                                        textAlign: 'center',
                                        color: '#2563eb',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.875rem'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#eff6ff'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    View all results for "{searchQuery}"
                                </div>
                            </div>
                        )}
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
                            <div className="nav-item-wrapper" key={index}>
                                <Link to={`/catalog?cat=${cat.name}`} className="nav-link">
                                    {cat.name} <ChevronDown size={14} style={{ marginTop: 2, opacity: 0.7 }} />
                                </Link>
                                <div className="dropdown-menu">
                                    {cat.subcategories.map(sub => (
                                        <Link key={sub} to={`/catalog?search=${sub}`} className="dropdown-item">
                                            {sub}
                                        </Link>
                                    ))}
                                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0.5rem 0' }}></div>
                                    <Link to={`/catalog?cat=${cat.name}`} className="dropdown-item view-all-link">
                                        View All {cat.name}
                                    </Link>
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
