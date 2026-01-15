import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Grid, List, SlidersHorizontal, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumProductCard from '../components/PremiumProductCard';
import api from '../utils/api';
import { CATEGORIES } from '../data/categories';
import { AnimatedGradientBackground, GridPattern } from '../components/ui/AnimatedBackground';
import './Catalog.css';

const BRANDS = ["Generic", "Omron", "Philips", "3M", "Nidek", "ResMed"];

const Catalog = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('cat');

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [sortOption, setSortOption] = useState('');
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [minRating, setMinRating] = useState(0);

    // UI State
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


    // Polling Logic
    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async (isBackground = false) => {
            if (!isBackground) setLoading(true);
            try {
                let url = '/api/products?';

                if (searchQuery) url += `search=${searchQuery}&`;
                if (categoryQuery) url += `category=${categoryQuery}&`;

                if (sortOption) url += `sort=${sortOption}&`;
                if (inStockOnly) url += `inStock=true&`;
                if (selectedBrand) url += `brand=${encodeURIComponent(selectedBrand)}&`;
                if (minRating > 0) url += `rating=${minRating}&`;

                if (priceRange[1] < 5000) {
                    url += `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&`;
                }

                const res = await api.get(url);
                if (isMounted) setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                if (!isBackground && isMounted) setLoading(false);
            }
        };

        // Initial fetch
        fetchProducts();

        // Poll every 5 seconds for updates
        const intervalId = setInterval(() => {
            fetchProducts(true); // background fetch
        }, 5000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [searchQuery, categoryQuery, sortOption, inStockOnly, priceRange, selectedBrand, minRating]);


    const pageTitle = searchQuery ? `Search Results for "${searchQuery}"` : (categoryQuery ? `${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)} Products` : 'Full Catalog');

    // Reset all filters
    const clearFilters = () => {
        setPriceRange([0, 5000]);
        setInStockOnly(false);
        setSortOption('');
        setSelectedBrand('');
        setMinRating(0);
    };

    return (
        <div className="catalog-page section">
            <div className="container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/">Home</Link> <ChevronRight size={14} />
                    <span className="current">Catalog</span>
                </div>

                <div className="cat-header" style={{ position: 'relative', overflow: 'hidden', padding: '2rem 2rem', borderRadius: '1.5rem', background: '#F8FAFC', marginBottom: '3rem' }}>
                    <AnimatedGradientBackground />
                    <GridPattern />
                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}
                        >
                            {pageTitle}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}
                        >
                            Browse our extensive collection of medical supplies and equipment.
                        </motion.p>
                    </div>
                </div>

                <div className="cat-layout">
                    {/* Sidebar Filters */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="cat-sidebar"
                    >
                        <div className="filter-group">
                            <div className="fg-header">
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Filter size={18} /> Categories
                                </h4>
                            </div>
                            <ul className="filter-list tree" style={{ marginTop: '1rem' }}>
                                <li><Link to="/catalog" style={{ fontWeight: !categoryQuery ? 600 : 400, color: !categoryQuery ? '#2563EB' : 'inherit' }}>All Products</Link></li>
                                {CATEGORIES.map((cat) => (
                                    <li key={cat.name} style={{ marginTop: '0.4rem' }}>
                                        <Link to={`/catalog?cat=${cat.name}`} style={{
                                            paddingLeft: '0.75rem',
                                            borderLeft: categoryQuery === cat.name ? '2px solid #2563EB' : '2px solid transparent',
                                            color: categoryQuery === cat.name ? '#2563EB' : 'inherit',
                                            fontWeight: categoryQuery === cat.name ? 600 : 400,
                                            transition: 'all 0.2s'
                                        }}>
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter-group">
                            <div className="fg-header">
                                <h4>Availability</h4>
                            </div>
                            <label className="flex items-center gap-2" style={{ cursor: 'pointer', marginTop: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    checked={inStockOnly}
                                    onChange={(e) => setInStockOnly(e.target.checked)}
                                />
                                In Stock Only
                            </label>
                        </div>

                        <div className="filter-group">
                            <div className="fg-header"><h4>Brand</h4></div>
                            <select
                                className="form-control"
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                            >
                                <option value="">All Brands</option>
                                {BRANDS.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <div className="fg-header"><h4>Rating</h4></div>
                            <div className="rating-filter" style={{ marginTop: '0.5rem' }}>
                                {[4, 3, 2, 1].map((star) => (
                                    <label key={star} className="rating-item">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === star}
                                            onChange={() => setMinRating(star)}
                                        />
                                        <span style={{ display: 'flex', color: '#fbbf24', fontSize: '0.9rem' }}>
                                            {"★".repeat(star)}{"☆".repeat(5 - star)}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>& Up</span>
                                    </label>
                                ))}
                                <label className="rating-item">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={minRating === 0}
                                        onChange={() => setMinRating(0)}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#475569' }}>Any Rating</span>
                                </label>
                            </div>
                        </div>

                        <div className="filter-group">
                            <div className="fg-header">
                                <h4>Price range</h4>
                                <ChevronDown size={16} />
                            </div>
                            <div className="price-slider">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}+</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={clearFilters}
                            className="btn btn-outline btn-sm"
                            style={{ width: '100%', marginTop: '1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <X size={16} /> Reset Filters
                        </motion.button>
                    </motion.aside>

                    {/* Main Content */}
                    <main className="cat-content">
                        <div className="toolbar">
                            <span>Showing {products.length} products</span>
                            <div className="toolbar-controls">
                                <div className="sort-box">
                                    <span>Sort by: </span>
                                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                        <option value="">Best Match</option>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="priceAsc">Price: Low to High</option>
                                        <option value="priceDesc">Price: High to Low</option>
                                    </select>
                                </div>
                                <div className="view-mode">
                                    <button
                                        className={viewMode === 'grid' ? 'active' : ''}
                                        onClick={() => setViewMode('grid')}>
                                        <Grid size={18} />
                                    </button>
                                    <button
                                        className={viewMode === 'list' ? 'active' : ''}
                                        onClick={() => setViewMode('list')}>
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ textAlign: 'center', padding: '8rem 4rem' }}
                                >
                                    <div className="spinner" style={{ margin: '0 auto' }}></div>
                                    <p style={{ marginTop: '1.5rem', color: '#64748B', fontSize: '1.1rem' }}>Loading products...</p>
                                </motion.div>
                            ) : products.length > 0 ? (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={viewMode === 'grid' ? "grid-cols-3 product-grid" : "list-view product-list"}
                                    style={{ gap: '2rem' }}
                                >
                                    {products.map((p, idx) => (
                                        <PremiumProductCard key={p._id} product={p} index={idx} viewMode={viewMode} />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ textAlign: 'center', padding: '8rem 4rem', color: '#64748B', background: '#F8FAFC', borderRadius: '1.5rem', border: '1px dashed #E2E8F0' }}
                                >
                                    <SlidersHorizontal size={48} style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>No products found.</h3>
                                    <p>Try adjusting your filters or search query.</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clearFilters}
                                        className="btn btn-primary"
                                        style={{ marginTop: '2rem', padding: '0.75rem 2rem' }}
                                    >
                                        Clear All Filters
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!loading && products.length > 0 && (
                            <div className="pagination">
                                <button className="page-btn disabled">&lt;</button>
                                <button className="page-btn active">1</button>
                                <button className="page-btn">&gt;</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
