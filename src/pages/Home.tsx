import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import ProductCard from '../components/ProductCard';
import Brands from '../components/Brands';
import { Zap, Truck } from 'lucide-react';
import api from '../utils/api';
import './Home.css';

const categories = [
    { name: 'Patient Aids', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop', id: 'patients' },
    { name: 'Diabetic Supplies', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop', id: 'diabetic' },
    { name: 'Orthopedic Braces', img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=400&auto=format&fit=crop', id: 'orthopedic' },
    { name: 'Mobility', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=400&auto=format&fit=crop', id: 'mobility' },
    { name: 'Wound Care', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=400&auto=format&fit=crop', id: 'wound-care' }
];

const Home = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/api/products?limit=8');
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
            <section className="section" style={{ background: 'white', padding: '5rem 0 2rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Welcome to Scott's Medical Supply
                    </h2>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#475569', marginBottom: '1.5rem' }}>
                        Scott's Medical Supply is one of the fastest growing companies in the Caribbean. <br className="hidden-mobile" />
                        We sell and rent medical equipment to <strong>patients</strong>, <strong>doctors</strong>, and <strong>hospitals</strong>.
                    </p>
                    <div style={{ width: '60px', height: '4px', background: '#2563EB', margin: '0 auto', borderRadius: '4px' }}></div>
                </div>
            </section>

            {/* Customer Segments: Patients, Doctors, Hospitals */}
            <section className="section" style={{ background: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Patients */}
                        <div className="segment-card" style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563EB', fontWeight: 700 }}>Patients</h3>
                            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                                Our primary goal in business is to ensure complete satisfaction when a patient comes to our website.
                                We accept most insurance on covered products.
                            </p>
                            <a href="/catalog?cat=patients" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Shop for Patients <Zap size={16} />
                            </a>
                        </div>

                        {/* Doctors */}
                        <div className="segment-card" style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563EB', fontWeight: 700 }}>Doctors</h3>
                            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                                Doctors need the right tools in their practice. At Scott's Medical Supply Grenada, we provide the latest
                                technological tools for the physician and the best equipment to support their office.
                            </p>
                            <a href="/doctors" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Shop for Doctors <Zap size={16} />
                            </a>
                        </div>

                        {/* Hospitals */}
                        <div className="segment-card" style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563EB', fontWeight: 700 }}>Hospitals</h3>
                            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                                Scott's Medical Grenada provides the latest in hospital equipment, hospital beds, MRI and X-ray units.
                                We supply gowns, gloves, bandages and everything that is necessary to support inpatient care.
                            </p>
                            <a href="/catalog?cat=hospital" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Shop for Hospitals <Zap size={16} />
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* One Stop Shop & Scott's Medical Banners (Modern Cards) */}
            <section style={{ background: '#F8FAFC', padding: '3rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                        {/* Left Banner - Modern */}
                        <div className="banner-card" style={{
                            background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
                            padding: '3rem',
                            borderRadius: '1.5rem',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 20px 25px -5px rgba(15, 118, 110, 0.15)'
                        }}>
                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                                    YOUR ONE STOP<br />SHOP FOR MEDICAL<br />SUPPLIES
                                </h3>
                                <p style={{ fontSize: '1.1rem', opacity: 0.9, fontWeight: 500 }}>We supply most of the Caribbean</p>
                            </div>
                            <Truck size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }} />
                        </div>

                        {/* Right Banner - Modern */}
                        <div className="banner-card" style={{
                            background: 'white',
                            padding: '3rem',
                            borderRadius: '1.5rem',
                            border: '1px solid #E2E8F0',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', color: '#B91C1C', letterSpacing: '-0.02em' }}>
                                    SCOTT'S MEDICAL<br />SUPPLY GRENADA
                                </h3>
                                <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '280px', lineHeight: 1.5 }}>
                                    Find out more about our premium customer service
                                </p>
                            </div>
                            <div style={{
                                width: '80px', height: '80px',
                                background: '#FEF2F2', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(185, 28, 28, 0.1)'
                            }}>
                                <span style={{ fontSize: '2.5rem' }}>👍</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Featured Products Grid - 8 Items */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', textAlign: 'center' }}>
                        <span style={{ color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                            FEATURED PRODUCTS
                        </span>
                        <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                            Most Popular Products
                        </h2>
                    </div>

                    <div className="grid-cols-4" style={{ gap: '2.5rem' }}>
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} style={{ height: '420px', background: '#f1f5f9', borderRadius: '1rem' }}></div>
                            ))
                        ) : (
                            featured.map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Video Section */}
            <section className="section" style={{ background: '#F0F9FF' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span style={{ background: '#2563EB', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', display: 'inline-block' }}>
                                Featured Video
                            </span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                Breg DUO Dynamic Osteoarthritis Bracing
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                A unique design, our DUO (Dynamic Unloading Osteoarthritis) brace is the only dual-upright dynamic OA brace on the market.
                                This brace creates a load across the joint when the knee is extended and reduces the load as the knee flexes.
                                Thus, when the patient is bearing weight, the brace is actively unloading. DUO reduces force when sitting,
                                making it ideal for patients who need to wear a brace for daily activities.
                            </p>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                Additionally, DUO provides support for ligament instability. It works to apply a corrective force in the last 30 degrees of extension when the most relief is needed.
                                That load is removed as the knee moves into flexion and symptoms are no longer present. DUO is ideal for OA patients who wear braces for extended periods of time.
                            </p>
                            <a href="/catalog?search=Breg" className="btn btn-primary">
                                View Products
                            </a>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                                height: 0,
                                overflow: 'hidden',
                                borderRadius: '1rem',
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                            }}>
                                <iframe
                                    src="https://www.youtube.com/embed/yCNeHKF0QqY?rel=0"
                                    title="Breg DUO Dynamic Osteoarthritis Bracing"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 0
                                    }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Row */}
            <section className="section" style={{ background: '#F8FAFC' }}>
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Browse Top Categories</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        justifyContent: 'center'
                    }}>
                        {categories.map((cat, idx) => (
                            <a href={`/catalog?category=${cat.id}`} key={idx} className="category-card" style={{
                                textAlign: 'center',
                                background: 'white',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
                            }}>
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={cat.img} alt={cat.name} style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s'
                                    }} />
                                </div>
                                <div style={{ padding: '1.5rem 1rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', fontWeight: 700, color: '#1E293B' }}>{cat.name}</h3>
                                    <span style={{ fontSize: '0.95rem', color: '#2563EB', fontWeight: 600 }}>Shop Now</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offers Grid */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap fill="var(--primary)" color="var(--primary)" /> Special Offers
                        </h2>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div className="grid-cols-4">
                            {featured.slice(4, 8).map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Testimonials />

            <Brands />

            {/* Newsletter Section */}
            <section style={{ background: 'var(--primary)', padding: '4rem 0', color: 'white', marginTop: '2rem' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join Our Newsletter</h2>
                    <p style={{ opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Subscribe to receive updates, access to exclusive deals, and more.
                    </p>
                    <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', display: 'flex' }}>
                        <input type="email" placeholder="Enter your email address" style={{
                            width: '100%', padding: '1rem 1.5rem', borderRadius: '99px', border: 'none', outline: 'none'
                        }} />
                        <button style={{
                            position: 'absolute', right: '5px', top: '5px', bottom: '5px',
                            background: 'var(--text)', color: 'white', border: 'none',
                            borderRadius: '99px', padding: '0 2rem', fontWeight: 600
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
