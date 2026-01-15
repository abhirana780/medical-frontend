import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2 } from 'lucide-react';
import PremiumProductCard from './PremiumProductCard';
import api from '../utils/api';
import { ProductCardSkeleton } from './ui/Skeletons';
import { GridPattern } from './ui/AnimatedBackground';

const RecentlyViewed = ({ currentProductId }: { currentProductId?: string }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecent = async () => {
        const stored = localStorage.getItem('recentlyViewedIds');
        if (!stored) {
            setLoading(false);
            return;
        }

        let ids: string[] = JSON.parse(stored);

        // Filter out current product
        if (currentProductId) {
            ids = ids.filter(id => id !== currentProductId);
        }

        ids = ids.slice(0, 5); // Limit to top 5

        if (ids.length === 0) {
            setLoading(false);
            return;
        }

        try {
            const requests = ids.map(id => api.get(`/api/products/${id}`));
            const results = await Promise.allSettled(requests);

            const fetchedProducts = results
                .filter(r => r.status === 'fulfilled')
                .map(r => (r as PromiseFulfilledResult<any>).value.data);

            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Failed to load recently viewed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecent();
    }, [currentProductId]);

    const clearHistory = () => {
        localStorage.removeItem('recentlyViewedIds');
        setProducts([]);
    };

    if (!loading && products.length === 0) return null;

    return (
        <section className="recently-viewed" style={{ position: 'relative', padding: '6rem 0', background: '#F8FAFC', overflow: 'hidden' }}>
            <GridPattern />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{ padding: '0.5rem', background: '#E0F2FE', borderRadius: '0.75rem', color: '#0284C7' }}>
                                <History size={20} />
                            </div>
                            <span style={{ fontWeight: 600, color: '#0284C7', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your History</span>
                        </div>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                            {currentProductId ? 'Recently Viewed' : 'Based on your activity'}
                        </h2>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.05, color: '#EF4444' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearHistory}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'none',
                            border: 'none',
                            color: '#64748B',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.75rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Trash2 size={16} /> Clear History
                    </motion.button>
                </div>

                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                            {Array(4).fill(0).map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ height: '400px' }}
                                >
                                    <ProductCardSkeleton />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            layout
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}
                        >
                            {products.map((product, idx) => (
                                <PremiumProductCard key={product._id} product={product} index={idx} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default RecentlyViewed;
