import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import './ProductDetails.css';
import Loading from '../components/Loading';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    // State
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImg, setActiveImg] = useState('');
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('desc');

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/products/${id}`);
                setProduct(res.data);
                // Set initial active image
                setActiveImg(res.data.image || '');
                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching product details:", err);
                setError('Product not found or server error.');
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    // Mock Related Products (In a real app, fetch from API by category)
    const relatedProducts = [
        { _id: '1', name: "Mobb Aluminum Rolling Walker", category: "Mobility", price: 189.99, image: "https://www.scottsmedicalsupply.com/cdn/shop/collections/chair_medium.jpg?v=1513020067", rating: 4.8 },
        { _id: '2', name: "Drive Airgo Ultra-Light 6 Rollator", category: "Mobility", price: 199.95, image: "https://www.scottsmedicalsupply.com/cdn/shop/products/airgoultralight_large.jpg?v=1532370914", rating: 4.5 },
        { _id: '3', name: "Drive Travelite Transport Chair", category: "Mobility", price: 280.99, image: "https://www.scottsmedicalsupply.com/cdn/shop/products/travelite_large.jpg?v=1532366852", rating: 4.7 },
        { _id: '4', name: "Drive TranSport Aluminum Transport Chair", category: "Mobility", price: 299.95, image: "https://www.scottsmedicalsupply.com/cdn/shop/products/transportaluminumchair_large.jpg?v=1532366223", rating: 4.3 },
    ];

    if (loading) {
        return (
            <div className="section container text-center" style={{ padding: '4rem 0' }}>
                <Loading />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="section container text-center" style={{ padding: '4rem 0' }}>
                <h2 style={{ marginBottom: '1rem' }}>Product Not Found</h2>
                <p style={{ marginBottom: '2rem' }}>{error}</p>
                <Link to="/catalog" className="btn btn-primary">Back to Catalog</Link>
            </div>
        );
    }

    // Determine images to show in gallery
    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <div className="pd-container section">
            <div className="container">
                <Link to="/catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#64748B', textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> Back to Catalog
                </Link>

                {/* Top Section: Gallery & Info */}
                <div className="pd-grid">
                    {/* Gallery */}
                    <div className="pd-gallery">
                        <div className="pd-thumbs">
                            {images.map((img: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="thumb"
                                    className={`pd-thumb ${activeImg === img ? 'active' : ''}`}
                                    onClick={() => setActiveImg(img)}
                                    onError={(e: any) => e.target.src = 'https://via.placeholder.com/70'}
                                />
                            ))}
                        </div>
                        <div className="pd-main-image">
                            {product.oldPrice && product.price < product.oldPrice && (
                                <span className="discount-tag">Save ${(product.oldPrice - product.price).toFixed(0)}</span>
                            )}
                            <img src={activeImg || product.image} alt={product.name} />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="pd-info">
                        <h1>{product.name}</h1>
                        <div className="pd-rating">
                            <div style={{ display: 'flex', color: '#FBBF24' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < Math.floor(product.rating || 4.5) ? "#FBBF24" : "none"}
                                        strokeWidth={i < Math.floor(product.rating || 4.5) ? 0 : 2}
                                    />
                                ))}
                            </div>
                            <span>({product.reviews || 0} Reviews)</span>
                        </div>

                        <div className="pd-price-row">
                            <span className="pd-price">${product.price.toFixed(2)}</span>
                            {product.oldPrice && <span className="pd-old-price">${product.oldPrice.toFixed(2)}</span>}
                        </div>

                        <p style={{ marginBottom: '2rem', color: '#64748B', lineHeight: 1.6 }}>
                            {product.description}
                        </p>

                        <div className="pd-actions">
                            <div className="qty-selector">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={18} /></button>
                                <input type="text" value={qty} readOnly />
                                <button onClick={() => setQty(q => q + 1)}><Plus size={18} /></button>
                            </div>
                            <button
                                className={`btn btn-primary add-btn ${loading ? 'opacity-50' : ''}`}
                                onClick={() => {
                                    addToCart(product, qty);
                                    alert(`Added ${qty} ${product.name} to cart!`);
                                }}
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button className="btn btn-outline" style={{ padding: '0.75rem' }}>
                                <Heart size={20} />
                            </button>
                        </div>

                        <div className="pd-meta">
                            <div className="meta-item">
                                <Truck size={20} color="var(--primary)" />
                                <div>
                                    <strong>Free Shipping</strong>
                                    <div style={{ color: '#64748B', fontSize: '0.8rem' }}>On orders over $300</div>
                                </div>
                            </div>
                            <div className="meta-item">
                                <ShieldCheck size={20} color="var(--primary)" />
                                <div>
                                    <strong>Authentic</strong>
                                    <div style={{ color: '#64748B', fontSize: '0.8rem' }}>100% Genuine Medical Supplies</div>
                                </div>
                            </div>
                            <div className="meta-item">
                                <RefreshCw size={20} color="var(--primary)" />
                                <div>
                                    <strong>Returns</strong>
                                    <div style={{ color: '#64748B', fontSize: '0.8rem' }}>Subject to policy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Bottom Content */}
                <div className="pd-layout-bottom">
                    <div className="pd-main-col">
                        <div className="pd-tabs">
                            <button className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`} onClick={() => setActiveTab('desc')}>Description</button>
                            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Customer Reviews</button>
                            <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>Shipping Info</button>
                        </div>

                        {activeTab === 'desc' && (
                            <div className="pd-description">
                                <h3>Product Overview</h3>
                                <p>{product.description}</p>
                                <br />
                                <p>
                                    As a leading provider in the Caribbean, Scott's Medical Supply ensures that all our products meet the highest standards of safety and efficacy.
                                    {product.category === 'Mobility' && " This mobility aid is designed to provide independence and comfort."}
                                    {product.category === 'Diabetes' && " Essential for daily diabetes management and monitoring."}
                                    {product.category === 'Respiratory' && " Reliable respiratory support for home or travel use."}
                                </p>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="reviews-contain">
                                <div className="rating-summary">
                                    <div className="big-rating">{product.rating || 4.5}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', color: '#FBBF24' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={20} fill={i < Math.floor(product.rating || 4.5) ? "#FBBF24" : "#e5e7eb"} />
                                            ))}
                                        </div>
                                        <span>Based on {product.reviews || 0} reviews</span>
                                    </div>
                                    <button className="btn btn-primary" style={{ marginLeft: 'auto' }}>Write a Review</button>
                                </div>
                                <div className="review-list">
                                    <div className="review-card">
                                        <div className="review-header">
                                            <span className="reviewer-name">Verified Customer</span>
                                            <span className="review-date">Recent</span>
                                        </div>
                                        <div style={{ display: 'flex', color: '#FBBF24', marginBottom: '0.5rem' }}>
                                            <Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" />
                                        </div>
                                        <p>Excellent quality and fast shipping to Grenada! Very happy with my purchase of the {product.name}.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="pd-description">
                                <h3>Shipping Information</h3>
                                <p>We offer reliable shipping options across the Caribbean. Standard delivery times range from 3-5 business days.</p>
                                <p><strong>Grenada:</strong> Local delivery available within 24-48 hours.</p>
                                <p><strong>Other Islands:</strong> Rates calculated at checkout based on weight and destination.</p>
                            </div>
                        )}

                    </div>

                    <aside className="pd-sidebar">
                        <h4>Frequently Bought Together</h4>
                        {relatedProducts.slice(0, 2).map((p, i) => (
                            <div className="related-item" key={i}>
                                <img src={p.image} alt={p.name} className="related-thumb" />
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '500', lineHeight: 1.2, marginBottom: '0.25rem' }}>{p.name}</div>
                                    <div style={{ color: 'var(--primary)', fontWeight: '700' }}>${p.price}</div>
                                    <Link to={`/product/${p._id}`} className="btn btn-outline btn-xs" style={{ marginTop: '0.5rem', fontSize: '0.7rem', textDecoration: 'none', display: 'inline-block' }}>View</Link>
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>

                {/* Products You May Also Like */}
                <div style={{ marginTop: '4rem' }}>
                    <h3 className="mb-8 text-center">Products You May Also Like</h3>
                    <div className="grid-cols-4">
                        {relatedProducts.map(p => (
                            <ProductCard key={p._id} product={p as any} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
