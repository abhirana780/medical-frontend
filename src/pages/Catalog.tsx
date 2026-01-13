import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { CATEGORIES } from '../data/categories';
import './Catalog.css';

const Catalog = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('cat');

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // In a real app we might pass query params to the API: /api/products?search=...
                // For now, we fetch all and filter client-side as per current backend capabilities
                const res = await api.get('/api/products');
                let data = res.data;

                if (searchQuery) {
                    const lowerQuery = searchQuery.toLowerCase();
                    data = data.filter((p: any) =>
                        p.name.toLowerCase().includes(lowerQuery) ||
                        (p.description && p.description.toLowerCase().includes(lowerQuery)) ||
                        (p.category && p.category.toLowerCase().includes(lowerQuery))
                    );
                }

                if (categoryQuery) {
                    const lowerCat = categoryQuery.toLowerCase();
                    data = data.filter((p: any) =>
                        p.category && p.category.toLowerCase().includes(lowerCat)
                    );
                }

                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, categoryQuery]);

    const pageTitle = searchQuery ? `Search Results for "${searchQuery}"` : (categoryQuery ? `${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)} Products` : 'Full Catalog');

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
                                        <Link to={`/catalog?cat=${cat.name}`}>{cat.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter-group">
                            <div className="fg-header">
                                <h4>Price range</h4>
                                <ChevronDown size={16} />
                            </div>
                            <div className="price-slider">
                                <input type="range" min="0" max="2000" />
                                <div className="price-labels">
                                    <span>$0</span>
                                    <span>$2000+</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="cat-content">
                        <div className="toolbar">
                            <span>Showing {products.length} products</span>
                            <div className="toolbar-controls">
                                <div className="sort-box">
                                    <span>Sort by: </span>
                                    <select>
                                        <option>Best Match</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                    </select>
                                </div>
                                <div className="view-mode">
                                    <button className="active"><Grid size={18} /></button>
                                    <button><List size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading products...</div>
                        ) : products.length > 0 ? (
                            <div className="grid-cols-3 product-grid">
                                {products.map(p => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
                                <h3>No products found.</h3>
                                <p>Try adjusting your search or filters.</p>
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
