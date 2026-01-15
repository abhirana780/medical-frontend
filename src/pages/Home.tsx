import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import PremiumProductCard from '../components/PremiumProductCard';
import Brands from '../components/Brands';
import { Zap, Truck, Check } from 'lucide-react';
import api from '../utils/api';
import HeroVideoDialog from '../components/ui/HeroVideoDialog';
import { FocusCards } from '../components/ui/FocusCards';
import { InfiniteSlider } from '../components/ui/InfiniteSlider';
import { ProductCardSkeleton } from '../components/ui/Skeletons';
import RecentlyViewed from '../components/RecentlyViewed';
import './Home.css';



const categories = [
    { name: 'Patient Aids', img: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600', id: 'patients' }, // Specific: Doctor/Patient Care
    { name: 'Diabetic Supplies', img: 'https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=600', id: 'diabetic' }, // Specific: Glucometer/Testing
    { name: 'Orthopedic Braces', img: 'https://images.pexels.com/photos/7298616/pexels-photo-7298616.jpeg?auto=compress&cs=tinysrgb&w=600', id: 'orthopedic' }, // Specific: PT/Rehab context
    { name: 'Mobility', img: 'https://images.pexels.com/photos/4064230/pexels-photo-4064230.jpeg?auto=compress&cs=tinysrgb&w=600', id: 'mobility' }, // Verified Accessible Wheelchair Pexels Image
    { name: 'Wound Care', img: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600', id: 'wound-care' } // Specific: Bandaging
];

const Home = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/api/products?limit=12');
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const displayProducts = products;
    const featured = displayProducts.slice(0, 8);

    return (
        <>
            <Hero />

            {/* Company Introduction */}
            <motion.section
                className="section"
                style={{ background: 'white', padding: '5rem 0 2rem', textAlign: 'center' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="container" style={{ maxWidth: '1000px', position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: 'white',
                            padding: '4rem 2rem',
                            borderRadius: '2.5rem',
                            boxShadow: '0 20px 40px -20px rgba(0,0,0,0.1)',
                            border: '1px solid #F1F5F9'
                        }}
                    >
                        <motion.span
                            style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '1rem' }}
                        >
                            Since 2010
                        </motion.span>
                        <motion.h2
                            style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}
                        >
                            Grenada's Most Trusted <br />
                            <span style={{ color: '#2563EB' }}>Medical Supply Partner</span>
                        </motion.h2>
                        <motion.p
                            style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#475569', marginBottom: '0', maxWidth: '800px', margin: '0 auto' }}
                        >
                            Scott's Medical Supply is the leading provider of premium medical equipment in the Caribbean.
                            We specialize in sales and rentals for <strong>patients</strong>, <strong>physicians</strong>, and <strong>healthcare institutions</strong>.
                        </motion.p>
                    </motion.div>
                </div>
            </motion.section >

            {/* Customer Segments: Patients, Doctors, Hospitals */}
            <section className="section" style={{ background: 'white', padding: '6rem 0' }}>
                <div className="container">
                    <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>

                        {/* Patients */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '3rem 2.5rem',
                                background: '#F8FAFC',
                                borderRadius: '2rem',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.1)' }}>
                                <Zap size={32} color="#2563EB" fill="#2563EB" />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#0F172A', fontWeight: 800 }}>For Patients</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem' }}>
                                We ensure complete satisfaction with medical-grade equipment for home care.
                                Most insurance accepted on covered products.
                            </p>
                            <Link to="/catalog?cat=patients">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    style={{
                                        color: '#2563EB', fontWeight: 700, background: 'none',
                                        border: 'none', borderBottom: '2px solid #2563EB',
                                        padding: '0 0 4px 0', fontSize: '1rem',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    Shop Patient Care →
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Doctors */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '3rem 2.5rem',
                                background: '#F0F9FF',
                                borderRadius: '2rem',
                                border: '1px solid #BAE6FD',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.1)' }}>
                                <Truck size={32} color="#0284C7" fill="#0284C7" />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#0F172A', fontWeight: 800 }}>For Physicians</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem' }}>
                                Equip your practice with the latest technological tools and professional furniture
                                designed for the modern clinic.
                            </p>
                            <Link to="/doctors">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    style={{
                                        color: '#0284C7', fontWeight: 700, background: 'none',
                                        border: 'none', borderBottom: '2px solid #0284C7',
                                        padding: '0 0 4px 0', fontSize: '1rem',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    Professional Solutions →
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Hospitals */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '3rem 2.5rem',
                                background: '#F8FAFC',
                                borderRadius: '2rem',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.1)' }}>
                                <Check size={32} color="#0F172A" />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#0F172A', fontWeight: 800 }}>For Hospitals</h3>
                            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem' }}>
                                Large-scale equipment including MRI units, X-rays, and inpatient supplies.
                                We support healthcare infrastructure across the Caribbean.
                            </p>
                            <Link to="/catalog?cat=hospital">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    style={{
                                        color: '#0F172A', fontWeight: 700, background: 'none',
                                        border: 'none', borderBottom: '2px solid #0F172A',
                                        padding: '0 0 4px 0', fontSize: '1rem',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    Hospital Infrastructure →
                                </motion.button>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* One Stop Shop & Scott's Medical Banners (Premium UI) */}
            <section style={{ background: '#F8FAFC', padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                        {/* Left Banner - Premium Dark Teal */}
                        <motion.div
                            className="banner-card"
                            style={{
                                background: 'radial-gradient(circle at top right, #115E59, #0F766E, #042f2e)',
                                padding: '2.5rem',
                                borderRadius: '1.5rem',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -10px rgba(15, 118, 110, 0.25)',
                                minHeight: '260px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 30px 60px -12px rgba(15, 118, 110, 0.35)',
                            }}
                        >
                            {/* Decorative Background Pattern */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0.1,
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '32px 32px'
                            }} />

                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '99px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        marginBottom: '1.5rem',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}
                                >
                                    MEDICAL SUPPLIES
                                </motion.div>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em', textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                                    Your One Stop<br />
                                    <span style={{ color: '#5EEAD4' }}>Shop for Everything</span>
                                </h3>
                                <p style={{ fontSize: '1.15rem', opacity: 0.9, fontWeight: 400, marginBottom: '2rem', maxWidth: '300px', lineHeight: 1.6 }}>
                                    We supply most of the Caribbean with premium medical equipment.
                                </p>
                                <motion.button
                                    whileHover={{ x: 5, backgroundColor: 'white', color: '#0F766E' }}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.4)',
                                        padding: '0.875rem 2rem',
                                        borderRadius: '1rem',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Explore Catalog →
                                </motion.button>
                            </div>

                            {/* Animated Background Icon */}
                            <motion.div
                                style={{ position: 'absolute', right: '-30px', bottom: '-30px', opacity: 0.05, color: 'white' }}
                                animate={{ rotate: [0, 10, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Truck size={220} />
                            </motion.div>
                        </motion.div>

                        {/* Right Banner - Premium White Glass */}
                        <motion.div
                            className="banner-card"
                            style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '1.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -10px rgba(185, 28, 28, 0.08)',
                                border: '1px solid #FEE2E2',
                                minHeight: '260px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 30px 60px -12px rgba(185, 28, 28, 0.15)',
                                borderColor: '#FECACA'
                            }}
                        >
                            {/* Gradient Blob Background */}
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                right: '-20%',
                                width: '400px',
                                height: '400px',
                                background: 'radial-gradient(circle, rgba(254, 202, 202, 0.2) 0%, transparent 70%)',
                                borderRadius: '50%',
                                zIndex: 0
                            }} />

                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#B91C1C',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        marginBottom: '1rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    <span style={{ width: '8px', height: '8px', background: '#B91C1C', borderRadius: '50%' }}></span>
                                    Scott's Medical Supply
                                </motion.div>

                                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: '#1E293B', letterSpacing: '-0.02em' }}>
                                    Experience Premium<br />
                                    <span style={{
                                        background: 'linear-gradient(to right, #B91C1C, #EF4444)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>Customer Service</span>
                                </h3>

                                <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '320px', lineHeight: 1.6, marginBottom: '2rem' }}>
                                    We go above and beyond to ensure you have the right equipment when you need it.
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <motion.div
                                        style={{
                                            width: '60px', height: '60px',
                                            background: '#FEF2F2', borderRadius: '1rem',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 10px 20px rgba(185, 28, 28, 0.1)',
                                            border: '1px solid #FEE2E2'
                                        }}
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>🤝</span>
                                    </motion.div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#1E293B' }}>Trusted Partner</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748B' }}>In Grenada since 2010</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section >

            {/* Featured Products Grid - Premium 6 Items */}
            <section className="section" style={{ position: 'relative', background: '#FFFFFF', padding: '5rem 0' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 70%)' }} />
                    <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)' }} />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '1rem', background: '#EFF6FF', padding: '0.4rem 1rem', borderRadius: '100px' }}
                        >
                            Top Choice
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}
                        >
                            Featured Collection
                        </motion.h2>
                        <p style={{ color: '#64748B', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            Discover our most popular medical supplies, trusted by professionals and loved by patients for their quality and reliability.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: '2.5rem',
                        marginBottom: '4rem'
                    }}>
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} style={{ height: '450px' }}>
                                    <ProductCardSkeleton />
                                </div>
                            ))
                        ) : (
                            featured.slice(0, 6).map((product: any, idx) => (
                                <PremiumProductCard key={product._id} product={product} index={idx} />
                            ))
                        )}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link to="/catalog">
                            <motion.button
                                whileHover={{ scale: 1.02, paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'white',
                                    color: '#0F172A',
                                    border: '2px solid #E2E8F0',
                                    padding: '1rem 2rem',
                                    borderRadius: '100px',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                                }}
                            >
                                View All Products
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Video Section - Aceternity Inspired */}
            <section className="section" style={{ position: 'relative', background: '#0F172A', padding: '6rem 0', overflow: 'hidden' }}>
                {/* Background Glows */}
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem', background: 'rgba(37,99,235,0.1)',
                                border: '1px solid rgba(37,99,235,0.2)', borderRadius: '100px',
                                color: '#60A5FA', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem'
                            }}>
                                <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                                    <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#60A5FA', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
                                    <span style={{ position: 'relative', display: 'inline-flex', height: '8px', width: '8px', borderRadius: '50%', background: '#3B82F6' }}></span>
                                </span>
                                Featured Innovation
                            </div>

                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                                Revolutionary <br />
                                <span style={{
                                    background: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>Knee Support Tech</span>
                            </h2>

                            <p style={{ color: '#94A3B8', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                Meet the <strong>Breg DUO</strong> — the only dual-upright dynamic brace on the market.
                                Experience active unloading pressure when you need it most.
                                <br /><br />
                                <span style={{ display: 'block', borderLeft: '4px solid #3B82F6', paddingLeft: '1rem', color: '#CBD5E1', fontStyle: 'italic' }}>
                                    "Creates load across the joint when extended, reduces load as it flexes."
                                </span>
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/catalog?search=Breg">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            background: 'white', color: '#0F172A',
                                            padding: '1rem 2rem', borderRadius: '12px',
                                            fontWeight: 700, border: 'none', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                            boxShadow: '0 4px 10px rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        View Product <Zap size={18} fill="currentColor" />
                                    </motion.button>
                                </Link>
                                <motion.a
                                    href="https://www.breg.com" target="_blank"
                                    whileHover={{ x: 5 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '1rem 2rem', color: 'white', fontWeight: 600,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Visit Manufacturer →
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Video Content with Aceternity HeroVideoDialog */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ position: 'relative' }}
                        >
                            {/* Decorative elements behind video */}
                            <div style={{ position: 'absolute', inset: '-20px', background: 'linear-gradient(to right, #3B82F6, #EC4899)', borderRadius: '24px', opacity: 0.3, filter: 'blur(20px)', transform: 'rotate(-2deg)', pointerEvents: 'none' }}></div>

                            <HeroVideoDialog
                                className="block"
                                animationStyle="from-center"
                                videoSrc="https://www.youtube.com/embed/yCNeHKF0QqY?rel=0&autoplay=1"
                                thumbnailSrc="https://img.youtube.com/vi/yCNeHKF0QqY/maxresdefault.jpg"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Row - Aceternity Focus Cards */}
            <section className="section" style={{ background: '#F8FAFC', padding: '6rem 0' }}>
                <div className="container">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Browse Top Categories
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
                            Explore our comprehensive range of medical supplies designed for every need.
                        </p>
                    </motion.div>

                    <FocusCards cards={categories.map(cat => ({ title: cat.name, src: cat.img, id: cat.id }))} />

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/catalog">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'transparent',
                                    color: '#2563EB',
                                    border: '1px solid #2563EB',
                                    padding: '0.8rem 2.5rem',
                                    borderRadius: '100px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                View All Categories
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Special Offers Section - Premium Infinite Slider */}
            <section className="section" style={{ background: '#FFFFFF', padding: '6rem 0', overflow: 'hidden' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.4rem 1rem', background: '#FEF2F2',
                            border: '1px solid #FEE2E2', borderRadius: '100px',
                            color: '#EF4444', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem',
                            textTransform: 'uppercase', letterSpacing: '0.1em'
                        }}>
                            <Zap size={14} fill="#EF4444" /> Special Deals
                        </div>
                        <h2 style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Limited Time Offers
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: '600px' }}>
                            Don't miss out on these exclusive deals for top-quality medical equipment.
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} style={{ width: '320px', height: '400px', flexShrink: 0 }}>
                                    <ProductCardSkeleton />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <InfiniteSlider speed={30}>
                            {(products.filter((p: any) => p.isSale).length > 0
                                ? products.filter((p: any) => p.isSale)
                                : products.slice(0, 8)
                            ).map((product: any) => (
                                <div key={product._id} style={{ width: '340px', flexShrink: 0 }}>
                                    <PremiumProductCard product={product} index={0} />
                                </div>
                            ))}
                        </InfiniteSlider>
                    )}
                </div>
            </section >

            <Testimonials />

            <Brands />

            {/* Newsletter Section - Sleek Premium Strip */}
            <section style={{ padding: '4rem 0 2rem 0', position: 'relative' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            background: '#0F172A',
                            borderRadius: '2rem',
                            padding: '3rem',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '3rem',
                            flexWrap: 'wrap',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {/* Background Deco */}
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.1))', pointerEvents: 'none' }} />

                        <div style={{ flex: '1', minWidth: '300px', position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                                Stay <span style={{ color: '#60A5FA' }}>Healthy</span> & Informed
                            </h2>
                            <p style={{ color: '#94A3B8', fontSize: '1.05rem', margin: 0 }}>
                                Join 5,000+ subscribers for exclusive medical deals and healthcare insights.
                            </p>
                        </div>

                        <div style={{ flex: '1', maxWidth: '500px', width: '100%', position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'flex',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '0.4rem',
                                borderRadius: '1.25rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        padding: '0 1.5rem',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        width: '100%'
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: '#3B82F6' }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: '0.8rem 1.8rem',
                                        background: '#2563EB',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '1rem',
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Subscribe Now
                                </motion.button>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', marginLeft: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748B', fontSize: '0.8rem' }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981' }}></div>
                                    No Spam
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748B', fontSize: '0.8rem' }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981' }}></div>
                                    Cancel Anytime
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Recently Viewed Section */}
            <RecentlyViewed />
        </>
    );
};

export default Home;
