import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Trash2, Star, Quote } from 'lucide-react';
import toast from 'react-hot-toast';

const Reviews = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const { data } = await api.get('/api/products/reviews/all');
            setReviews(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (productId: string, reviewId: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await api.delete(`/api/products/${productId}/reviews/${reviewId}`);
                toast.success('Review deleted');
                setReviews(reviews.filter(r => r._id !== reviewId));
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete review');
            }
        }
    };

    if (loading) return <div className="p-4">Loading reviews...</div>;

    return (
        <div className="admin-page-container fade-in">
            <div className="admin-header">
                <div>
                    <h2 className="admin-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Customer Reviews</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage and moderate product reviews</p>
                </div>
                <div className="admin-actions">
                    <span className="coupon-tag">
                        <Star size={14} />
                        {reviews.length} Total Reviews
                    </span>
                </div>
            </div>

            <div className="admin-grid">
                {reviews.map((review) => (
                    <div key={review._id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <img
                                    src={review.productImage}
                                    alt={review.productName}
                                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                                <div>
                                    <h4 style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        color: '#0f172a',
                                        lineHeight: '1.2',
                                        marginBottom: '0.25rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {review.productName}
                                    </h4>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                fill={i < review.rating ? "#F59E0B" : "none"}
                                                color={i < review.rating ? "#F59E0B" : "#CBD5E1"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comment */}
                        <div style={{
                            background: '#F8FAFC',
                            padding: '1rem',
                            borderRadius: '8px',
                            flex: 1,
                            position: 'relative'
                        }}>
                            <Quote size={16} style={{ color: '#94A3B8', position: 'absolute', top: '0.5rem', left: '0.5rem', opacity: 0.5 }} />
                            <p style={{
                                fontSize: '0.9rem',
                                color: '#475569',
                                lineHeight: '1.6',
                                fontStyle: 'italic',
                                paddingLeft: '1.25rem'
                            }}>
                                "{review.comment}"
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="card-footer-row" style={{ paddingTop: '0.5rem', borderTop: '1px solid #F1F5F9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E0F2FE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    {review.name.charAt(0)}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>{review.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(review.product, review._id)}
                                style={{
                                    background: '#FEF2F2',
                                    color: '#EF4444',
                                    border: '1px solid #FECACA',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}
                                title="Delete Review"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    <div style={{ background: 'white', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                        <Star size={32} color="#CBD5E1" />
                    </div>
                    <h3>No reviews found</h3>
                    <p>When customers review products, they will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default Reviews;
