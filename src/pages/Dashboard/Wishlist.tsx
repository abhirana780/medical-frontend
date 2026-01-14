import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard';
import Loading from '../../components/Loading';

const Wishlist = () => {
    const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/users/wishlist');
            setWishlistProducts(res.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) return <Loading />;

    const hasItems = wishlistProducts.length > 0;

    return (
        <div>
            <h2 className="dash-title">My Wishlist</h2>

            {/* Empty State */}
            {!hasItems && (
                <div className="empty-state">
                    <div className="heart-circle-bg">
                        <Heart size={32} color="#94a3b8" fill="#94a3b8" style={{ marginLeft: '-1px', transform: 'scale(1.2)' }} />
                    </div>
                    <h3>Your wishlist is empty.</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</p>
                    <Link to="/catalog" className="btn btn-primary">Start Shopping</Link>
                </div>
            )}

            {/* Wishlist Grid */}
            {hasItems && (
                <div className="grid-cols-4" style={{ marginTop: '2rem' }}>
                    {wishlistProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
