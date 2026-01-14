import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

const testimonials = [
    {
        name: "John Doe",
        role: "Diabetes Patient",
        quote: "The glucose monitor I bought from Scott's Medical is a complete lifesaver. It's accurate, easy to use, and the support team helped me set it up. Highly recommended for anyone tracking their sugar levels.",
        img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Sarah Smith",
        role: "Caregiver",
        quote: "Excellent service and incredibly fast shipping. The wheelchair arrived in perfect condition and has significantly improved my father's mobility. The quality of equipment here is unmatched.",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Dr. James Wilson",
        role: "Physician",
        quote: "I've been recommending Scott's Medical Supply for years. Their commitment to providing reliable, medical-grade equipment is consistent. They are a trusted partner in Grenada's healthcare.",
        img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Physical Therapist",
        quote: "The quality of orthopedic braces available here is exceptional. My patients have seen faster recovery times thanks to the professional-grade support provided by these products.",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Robert Fox",
        role: "Home Health Aide",
        quote: "Ordering supplies for my clients has never been easier. The website is intuitive, and the recurring order feature ensures we never run out of critical medical supplies. Great team!",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Lisa Chen",
        role: "Post-Op Recovery",
        quote: "After my surgery, I needed specific equipment at home. Scott's Medical delivered everything the next day and even helped with the assembly. Truly exceptional customer service.",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        rating: 5
    }
];

const Testimonials = () => {
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
                            Trusted by More Than <span style={{ color: '#2563EB' }}>5,000+</span> Customers
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                            We pride ourselves on providing the highest quality medical supplies and equipment to the Caribbean community.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {testimonials.map((t, idx) => (
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
                                "{t.quote}"
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={t.img}
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
                                    <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>{t.role}</span>
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
