import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedGradientBackground, GridPattern, FloatingParticles, WaveAnimation } from './ui/AnimatedBackground';

import './Hero.css';

import heroMain from '../assets/hero-main-v2.png';
import heroMonitor from '../assets/hero-monitor-v2.png';
import heroWalker from '../assets/hero-walker-v2.png';
import heroCpap from '../assets/hero-cpap-v2.png';

const Hero = () => {
    return (
        <>
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Beautiful Animated Background */}
                <AnimatedGradientBackground />
                <GridPattern />
                <FloatingParticles />
                <WaveAnimation />

                {/* Content */}
                <div className="container hero-container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            className="subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            Welcome to Scott's Medical Supply Grenada!
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Unsurpassed Service, <br />
                            <motion.span
                                className="highlight"
                                animate={{
                                    backgroundPosition: ["0% center", "100% center"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                style={{
                                    backgroundSize: "200% auto",
                                    backgroundImage: "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                Fast Delivery & Great Pricing
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            We pride ourselves at providing unsurpassed customer service, fast delivery and great pricing.
                            That is why we are one of the fastest growing medical supply companies in the Caribbean!
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <Link to="/catalog" className="btn btn-primary hero-btn" style={{ position: 'relative', overflow: 'hidden' }}>
                                <span style={{ position: 'relative', zIndex: 10 }}>Shop Now</span>
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        transform: 'translateX(-100%)'
                                    }}
                                    animate={{ x: ['100%', '-100%'] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                                />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        style={{ position: 'relative', zIndex: 5 }}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.div
                            className="circle-bg"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.div>
                        <motion.img
                            src={heroMain}
                            alt="Medical Equipment Showroom"
                            className="MainImage"
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Decorative small circles simulating the collage effect */}
                        <motion.img
                            src={heroMonitor}
                            className="floating-img img-1"
                            alt="Vital Signs Monitor"
                            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                        />
                        <motion.img
                            src={heroWalker}
                            className="floating-img img-2"
                            alt="Mobility Walker"
                            animate={{ y: [0, 20, 0], x: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        />
                        <motion.img
                            src={heroCpap}
                            className="floating-img img-3"
                            alt="CPAP Machine"
                            animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features Strip - Modern & Attractive */}
            <motion.div
                className="features-strip container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    padding: '2.5rem',
                    background: 'white',
                    marginTop: '-4rem',
                    position: 'relative',
                    zIndex: 20,
                    borderRadius: '1.5rem',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    maxWidth: '1200px',
                }}
            >
                {[
                    {
                        icon: Truck,
                        title: 'Free Shipping',
                        desc: 'On orders over $50',
                        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        iconBg: 'rgba(102, 126, 234, 0.1)',
                        iconColor: '#667eea'
                    },
                    {
                        icon: ShieldCheck,
                        title: 'Secure Payment',
                        desc: '100% Secure Transaction',
                        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        iconBg: 'rgba(240, 147, 251, 0.1)',
                        iconColor: '#f093fb'
                    },
                    {
                        icon: Phone,
                        title: '24/7 Support',
                        desc: 'Dedicated Support',
                        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        iconBg: 'rgba(79, 172, 254, 0.1)',
                        iconColor: '#4facfe'
                    }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        className="feature-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (idx * 0.05), duration: 0.3 }}
                        whileHover={{
                            y: -8,
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            background: 'white',
                            border: '1px solid #f1f5f9',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Gradient overlay on hover */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: feature.gradient,
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                            }}
                            whileHover={{ opacity: 0.03 }}
                        />

                        <motion.div
                            className="icon-box"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: feature.iconBg,
                                color: feature.iconColor,
                                width: '70px',
                                height: '70px',
                                borderRadius: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                position: 'relative',
                                zIndex: 2,
                                boxShadow: `0 8px 20px ${feature.iconColor}20`,
                            }}
                        >
                            <feature.icon size={32} strokeWidth={2} />
                        </motion.div>

                        <div className="text-box" style={{ position: 'relative', zIndex: 2 }}>
                            <h4 style={{
                                margin: '0 0 0.25rem 0',
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: '#0f172a',
                            }}>
                                {feature.title}
                            </h4>
                            <p style={{
                                margin: 0,
                                fontSize: '0.9rem',
                                color: '#64748b',
                                fontWeight: 500,
                            }}>
                                {feature.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default Hero;
