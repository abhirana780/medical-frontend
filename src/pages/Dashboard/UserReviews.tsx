import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const UserReviews = () => {
    const { user } = useAuth();
    const [reviewableItems, setReviewableItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviewableProducts = async () => {
            if (!user) return;
            try {
                // Fetch user orders to get products they've bought
                const { data: orders } = await api.get('/api/orders/myorders');

                // Flatten all order items into a single list
                const items: any[] = [];
                const seenProducts = new Set();

                orders.forEach((order: any) => {
                    // For testing, we allow reviewing any ordered item, delivered or not
                    // In prod: if (order.isDelivered) { ... }
                    order.orderItems.forEach((item: any) => {
                        // Avoid duplicates if bought multiple times (optional logic)
                        if (!seenProducts.has(item.product)) {
                            seenProducts.add(item.product);
                            items.push({
                                ...item,
                                orderDate: order.createdAt,
                                orderId: order._id
                            });
                        }
                    });
                });

                setReviewableItems(items);
            } catch (error) {
                console.error("Error fetching reviewable items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewableProducts();
    }, [user]);

    if (loading) return <div>Loading products to review...</div>;

    return (
        <div>
            <h2 className="dash-title">My Reviews & Ratings</h2>
            <p className="text-muted mb-4">Rate and review products you've purchased.</p>

            {reviewableItems.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: '0.5rem' }}>
                    <p>You haven't purchased any products yet.</p>
                    <Link to="/catalog" className="btn btn-primary mt-3">Start Shopping</Link>
                </div>
            ) : (
                <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
                    {reviewableItems.map((item, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.75rem',
                            padding: '1.25rem',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center'
                        }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                                    Purchased on {new Date(item.orderDate).toLocaleDateString()}
                                </p>
                                <Link
                                    to={`/product/${item.product}?review=true`}
                                    className="btn btn-outline btn-sm"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Star size={14} /> Write a Review
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserReviews;
