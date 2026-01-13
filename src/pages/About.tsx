import { Truck, ShieldCheck, HeartPulse, Clock } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '6rem 0', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>About Us</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                        Providing high-quality medical equipment and supplies to the Caribbean with a commitment to care and excellence.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span className="badge badge-new" style={{ marginBottom: '1rem', display: 'inline-block' }}>Our Story</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>
                                Fast Growing. Reliable. Caring.
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Scott's Medical Supply is one of the fastest growing companies in the Caribbean. We are dedicated to bridging the gap between quality healthcare products and the people who need them most.
                            </p>
                            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                Whether you are a patient recovering at home, a doctor equipping a new clinic, or a hospital in need of bulk supplies, we are your trusted partner. We specialize in both <strong>sales</strong> and <strong>rentals</strong> of medical equipment.
                            </p>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ background: '#F1F5F9', borderRadius: '2rem', padding: '2rem' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop"
                                    alt="Medical Supply Warehouse"
                                    style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section" style={{ background: '#F8FAFC' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Why Choose Us?</h2>
                        <p style={{ color: '#64748B' }}>We go above and beyond to ensure you have what you need.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {/* Value 1 */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: '#E0F2FE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#0284C7' }}>
                                <Truck size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fast Delivery</h3>
                            <p style={{ color: '#64748B' }}>We understand that medical needs can't wait. We prioritize quick and safe delivery across the region.</p>
                        </div>

                        {/* Value 2 */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#16A34A' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Key Quality</h3>
                            <p style={{ color: '#64748B' }}>We source only from trusted manufacturers to ensure reliability and safety for all our products.</p>
                        </div>

                        {/* Value 3 */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: '#FEF9C3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#CA8A04' }}>
                                <HeartPulse size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Patient Focused</h3>
                            <p style={{ color: '#64748B' }}>Our primary goal is patient satisfaction. We are here to support your recovery and health journey.</p>
                        </div>

                        {/* Value 4 */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: '#F3E8FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#9333EA' }}>
                                <Clock size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Reliable Service</h3>
                            <p style={{ color: '#64748B' }}>Rent or buy with confidence. Our team is always ready to assist with any questions or service needs.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
