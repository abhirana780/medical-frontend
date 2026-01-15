import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import PremiumProductCard from '../../components/PremiumProductCard';
import Loading from '../../components/Loading';
import { AnimatedGradientBackground, GridPattern } from '../../components/ui/AnimatedBackground';

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
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="dash-title"
                        style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}
                    >
                        My Wishlist
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ color: '#64748B', margin: '0.5rem 0 0' }}
                    >
                        {hasItems ? `You have ${wishlistProducts.length} items in your wishlist.` : 'Keep track of items you love.'}
                    </motion.p>
                </div>
                {hasItems && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline btn-sm"
                        style={{ borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: '#E2E8F0', color: '#64748B' }}
                    >
                        <Trash2 size={16} /> Clear All
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {/* Empty State */}
                {!hasItems ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            padding: '6rem 2rem',
                            borderRadius: '1.5rem',
                            background: '#F8FAFC',
                            textAlign: 'center',
                            border: '1px dashed #E2E8F0'
                        }}
                    >
                        <AnimatedGradientBackground />
                        <GridPattern />

                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem',
                                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
                            }}>
                                <Heart size={40} color="#EF4444" fill="#EF4444" />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Your wishlist is empty</h3>
                            <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                                Looks like you haven't added anything to your wishlist yet. Explore our catalog to find products you love.
                            </p>
                            <Link to="/catalog">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-primary"
                                    style={{ padding: '0.75rem 2rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                                >
                                    Start Browsing <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="wishlist-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="grid-cols-4 product-grid" style={{ gap: '2rem' }}>
                            {wishlistProducts.map((product, idx) => (
                                <PremiumProductCard key={product._id} product={product} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Wishlist;
