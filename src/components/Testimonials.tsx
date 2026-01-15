import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';

const Testimonials = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get('/api/products/reviews/top');
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching reviews", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return null; // Or a skeleton/loader

    if (reviews.length === 0) return null;

    return (
        <section style={{ background: '#F8FAFC', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
            {/* Soft Background Blurs */}
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{
                            background: '#EFF6FF', color: '#2563EB', padding: '0.5rem 1.25rem',
                            borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700,
                            marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <CheckCircle2 size={16} /> Verified Patient Stories
                        </span>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                            Trusted by Our <span style={{ color: '#2563EB' }}>Customers</span>
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                            Real feedback from our community.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {reviews.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '1.5rem',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03)',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative'
                            }}
                        >
                            <Quote
                                size={40}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#EFF6FF', zIndex: 0 }}
                            />

                            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < t.rating ? "#FBBF24" : "none"}
                                        color={i < t.rating ? "#FBBF24" : "#E2E8F0"}
                                    />
                                ))}
                            </div>

                            <p style={{
                                color: '#334155',
                                fontSize: '1.1rem',
                                lineHeight: 1.7,
                                marginBottom: '2rem',
                                fontStyle: 'italic',
                                position: 'relative',
                                zIndex: 1,
                                flexGrow: 1
                            }}>
                                "{t.comment}"
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${t.name}&background=random`}
                                        alt={t.name}
                                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 0 0 2px #EFF6FF' }}
                                    />
                                    <div style={{
                                        position: 'absolute', bottom: 0, right: 0,
                                        background: '#2563EB', color: 'white',
                                        borderRadius: '50%', width: '18px', height: '18px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        <CheckCircle2 size={12} />
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>{t.name}</h4>
                                    <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>
                                        {t.productName ? `Reviewed: ${t.productName.substring(0, 30)}${t.productName.length > 30 ? '...' : ''}` : 'Verified Customer'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
