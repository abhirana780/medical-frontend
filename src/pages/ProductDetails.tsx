import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../utils/api';
import './ProductDetails.css';
import Loading from '../components/Loading';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // State
    const [product, setProduct] = useState<any | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImg, setActiveImg] = useState('');
    const location = useLocation();
    const [qty, setQty] = useState(1);

    // Initialize activeTab based on URL param
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('review') === 'true' ? 'reviews' : 'desc';
    });

    // Review State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    // Fetch Product Data
    const fetchProduct = async (isBackground = false) => {
        try {
            if (!isBackground) setLoading(true);
            const res = await api.get(`/api/products/${id}`);
            const currentProduct = res.data;
            setProduct(currentProduct);

            // Only set active image on initial load
            if (!isBackground) {
                setActiveImg(currentProduct.image || '');
            }

            // 1. Fetch Related Products (Only on initial load to save bandwidth)
            if (!isBackground) {
                try {
                    const relatedRes = await api.get(`/api/products?category=${currentProduct.category}&limit=5`);
                    const related = relatedRes.data.filter((p: any) => p._id !== currentProduct._id).slice(0, 4);
                    setRelatedProducts(related);
                } catch (err) {
                    console.error("Error fetching related products", err);
                }
            }

            // 2. Handle Recently Viewed (LocalStorage) - Only on initial load
            if (!isBackground) {
                const stored = localStorage.getItem('recentlyViewed');
                let viewedList = stored ? JSON.parse(stored) : [];

                viewedList = viewedList.filter((p: any) => p._id !== currentProduct._id);
                viewedList.unshift({
                    _id: currentProduct._id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    image: currentProduct.image,
                    isNewArrival: currentProduct.isNewArrival,
                    isSale: currentProduct.isSale
                });

                if (viewedList.length > 5) viewedList = viewedList.slice(0, 5);
                localStorage.setItem('recentlyViewed', JSON.stringify(viewedList));
                setRecentlyViewed(viewedList.filter((p: any) => p._id !== currentProduct._id));
            }

            if (!isBackground) setLoading(false);
        } catch (err: any) {
            console.error("Error fetching product details:", err);
            if (!isBackground) {
                setError('Product not found or server error.');
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        let intervalId: any;
        if (id) {
            fetchProduct();
            // Poll for updates (price/stock)
            intervalId = setInterval(() => {
                fetchProduct(true);
            }, 5000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [id]);

    // Scroll to review form if query param is present
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('review') === 'true' && !loading && product) {
            setActiveTab('reviews');
            setTimeout(() => {
                document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }, [location.search, loading, product]);


    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittingReview(true);
        try {
            await api.post(`/api/products/${id}/reviews`, {
                rating,
                comment,
            });
            alert('Review Submitted!');
            setComment('');
            setRating(5);
            fetchProduct(); // Refresh to see new review
        } catch (err: any) {
            alert(err.response?.data?.message || err.message);
        } finally {
            setSubmittingReview(false);
        }
    };

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
                                        fill={i < Math.floor(product.rating || 0) ? "#FBBF24" : "none"}
                                        strokeWidth={i < Math.floor(product.rating || 0) ? 0 : 2}
                                    />
                                ))}
                            </div>
                            <span>({product.numReviews || 0} Reviews)</span>
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
                            <button
                                className={`btn btn-outline`}
                                style={{ padding: '0.75rem', borderColor: isInWishlist(product._id) ? '#ef4444' : '' }}
                                onClick={() => {
                                    if (isInWishlist(product._id)) {
                                        removeFromWishlist(product._id);
                                    } else {
                                        addToWishlist(product._id);
                                    }
                                }}
                            >
                                <Heart size={20} fill={isInWishlist(product._id) ? "#ef4444" : "none"} color={isInWishlist(product._id) ? "#ef4444" : "currentColor"} />
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
                                    <div className="big-rating">{product.rating ? product.rating.toFixed(1) : '0.0'}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', color: '#FBBF24' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={20} fill={i < Math.floor(product.rating || 0) ? "#FBBF24" : "#e5e7eb"} />
                                            ))}
                                        </div>
                                        <span>Based on {product.numReviews || 0} reviews</span>
                                    </div>
                                    <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Write a Review
                                    </button>
                                </div>

                                <div className="review-list">
                                    {product.reviews && product.reviews.length > 0 ? (
                                        product.reviews.map((review: any) => (
                                            <div key={review._id} className="review-card">
                                                <div className="review-header">
                                                    <span className="reviewer-name">{review.name}</span>
                                                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div style={{ display: 'flex', color: '#FBBF24', marginBottom: '0.5rem' }}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < review.rating ? "#FBBF24" : "#e5e7eb"} />
                                                    ))}
                                                </div>
                                                <p>{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ fontStyle: 'italic', color: '#888' }}>No reviews yet. Be the first to review this product!</p>
                                    )}
                                </div>

                                <div id="review-form" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                                    <h3>Write a Customer Review</h3>
                                    {user ? (
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                                <label>Rating</label>
                                                <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </select>
                                            </div>
                                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                                <label>Comment</label>
                                                <textarea
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    rows={4}
                                                    style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                                    required
                                                ></textarea>
                                            </div>
                                            <button type="submit" disabled={submittingReview} className="btn btn-primary">
                                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="alert alert-info">
                                            Please <Link to="/login" style={{ textDecoration: 'underline' }}>sign in</Link> to write a review.
                                        </div>
                                    )}
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
                        <h4>Related Products</h4>
                        {relatedProducts.length > 0 ? relatedProducts.slice(0, 2).map((p, i) => (
                            <div className="related-item" key={i}>
                                <img src={p.image} alt={p.name} className="related-thumb" />
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '500', lineHeight: 1.2, marginBottom: '0.25rem' }}>{p.name}</div>
                                    <div style={{ color: 'var(--primary)', fontWeight: '700' }}>${p.price.toFixed(2)}</div>
                                    <Link to={`/product/${p._id}`} className="btn btn-outline btn-xs" style={{ marginTop: '0.5rem', fontSize: '0.7rem', textDecoration: 'none', display: 'inline-block' }}>View</Link>
                                </div>
                            </div>
                        )) : <p style={{ color: '#999', fontSize: '0.9rem' }}>No related products found.</p>}
                    </aside>
                </div>

                {/* Products You May Also Like (Expanded) */}
                {relatedProducts.length > 2 && (
                    <div style={{ marginTop: '4rem' }}>
                        <h3 className="mb-8 text-center">More Related Products</h3>
                        <div className="grid-cols-4">
                            {relatedProducts.slice(2).map(p => (
                                <ProductCard key={p._id} product={p as any} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recently Viewed */}
                {recentlyViewed.length > 0 && (
                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                        <h3 className="mb-4">Recently Viewed</h3>
                        <div className="grid-cols-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {recentlyViewed.map(p => (
                                <ProductCard key={p._id} product={p as any} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
