import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { CATEGORIES } from '../data/categories';
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

                <div className="cat-header">
                    <h1>{pageTitle}</h1>
                    <p>Browse our extensive collection of medical supplies and equipment.</p>
                </div>

                <div className="cat-layout">
                    {/* Sidebar Filters */}
                    <aside className="cat-sidebar">
                        <div className="filter-group">
                            <h4>Categories</h4>
                            <ul className="filter-list tree">
                                <li><Link to="/catalog">All Products</Link></li>
                                {CATEGORIES.map((cat) => (
                                    <li key={cat.name} className="ml-2">
                                        <Link to={`/catalog?cat=${cat.name}`} className={categoryQuery === cat.name ? 'active-cat' : ''}>
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

                        <button onClick={clearFilters} className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '1rem' }}>
                            Reset Filters
                        </button>
                    </aside>

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

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <div className="spinner"></div>
                                <p style={{ marginTop: '1rem' }}>Loading products...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <div className={viewMode === 'grid' ? "grid-cols-3 product-grid" : "list-view product-list"}>
                                {products.map(p => (
                                    <ProductCard key={p._id} product={p} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B', background: '#F8FAFC', borderRadius: '1rem' }}>
                                <h3>No products found.</h3>
                                <p>Try adjusting your filters or search query.</p>
                                <button
                                    onClick={clearFilters}
                                    className="btn btn-outline"
                                    style={{ marginTop: '1rem' }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

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
