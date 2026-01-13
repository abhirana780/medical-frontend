import { Star } from 'lucide-react';

const Wishlist = () => {
    // Check if we have items, for demo we emulate empty state first as per request
    const hasItems = false;

    const recentlyViewed = [
        { name: "L'Oreal Paris Revitalift", price: 15.45, rating: 4.5, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200" },
        { name: "Venus HD Matte Liquid", price: 12.45, rating: 4.8, img: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=200" },
        { name: "Rosemary Essential Oil", price: 9.45, rating: 4.7, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=200" },
        { name: "Face Glow Oil for Normal", price: 10.45, rating: 4.6, img: "https://images.unsplash.com/photo-1616686656755-27f32ba53a80?q=80&w=200" }
    ];

    return (
        <div>
            <h2 className="dash-title">My Wishlist</h2>

            {/* Empty State */}
            {!hasItems && (
                <div className="empty-state">
                    <div className="heart-circle-bg">
                        <Star size={32} color="#94a3b8" fill="#94a3b8" style={{ marginLeft: '-1px', transform: 'scale(1.2)' }} />
                        {/* Using Star/Heart visually similar only for empty state icon representation */}
                    </div>
                    <h3>Your wishlist is empty.</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</p>
                    <button className="btn btn-primary">Start Shopping</button>
                </div>
            )}

            {/* Recently Viewed */}
            <div style={{ marginTop: '4rem' }}>
                <h3 className="mb-8">Recently Viewed</h3>
                <div className="grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    {recentlyViewed.map((rec, i) => (
                        <div key={i} className="" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                            <img src={rec.img} alt={rec.name} style={{ height: '140px', objectFit: 'contain', marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{rec.name}</h4>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', marginBottom: '0.5rem' }}>
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={12} fill={idx < Math.floor(rec.rating) ? "#fbbf24" : "#e5e7eb"} color="none" />
                                ))}
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({rec.rating})</span>
                            </div>
                            <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${rec.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
