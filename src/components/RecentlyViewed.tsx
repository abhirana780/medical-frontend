
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import api from '../utils/api';
import { ProductCardSkeleton } from './ui/Skeletons';

const RecentlyViewed = ({ currentProductId }: { currentProductId?: string }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                // Fetch individually (parallel) since we don't have bulk endpoint
                // Use Promise.allSettled to avoid one failure breaking all
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

        fetchRecent();
    }, [currentProductId]);

    if (!loading && products.length === 0) return null;

    return (
        <div className="section recently-viewed" style={{ padding: '4rem 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <div className="container">
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#0f172a' }}>
                    {currentProductId ? 'Recently Viewed' : 'Your Browsing History'}
                </h3>

                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} style={{ height: '380px' }}>
                                <ProductCardSkeleton />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentlyViewed;
