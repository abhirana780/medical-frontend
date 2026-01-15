import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Mail, FileText, Activity, Truck, ChevronRight, Stethoscope } from 'lucide-react';
import { useCallback } from 'react';
import { AnimatedGradientBackground, GridPattern } from '../components/ui/AnimatedBackground';
import { BackgroundGradient } from '../components/ui/BackgroundGradient';
import { Meteors } from '../components/ui/Meteors';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import './Services.css';

const servicesData = [
    {
        title: "Upload Prescription",
        description: "Easily upload your doctor's prescription to order medicines directly from your device.",
        icon: FileText,
        colorClass: "blue",
        link: "/upload-prescription",
        btnText: "Upload Now"
    },
    {
        title: "Patient Inquiry",
        description: "Have specific questions? Fill out our detailed inquiry form and our medical staff will assist you.",
        icon: Mail,
        colorClass: "green",
        link: "/contact",
        btnText: "Inquire Now"
    },
    {
        title: "Track Order",
        description: "Stay updated on your delivery status. Track your medical supplies in real-time.",
        icon: Truck,
        colorClass: "orange",
        link: "/account/orders",
        btnText: "Track Now"
    },
    {
        title: "Medical History",
        description: "Securely access your past prescriptions and order history whenever you need them.",
        icon: Activity,
        colorClass: "red",
        link: "/account/medical-history",
        btnText: "View History"
    },
    {
        title: "Product Reviews",
        description: "Share your experience with our products to help the community make informed choices.",
        icon: Zap,
        colorClass: "purple",
        link: "/account/orders",
        btnText: "Manage Reviews"
    },
    {
        title: "Professional Services",
        description: "Dedicated support and bulk supply solutions for healthcare professionals and clinics.",
        icon: Stethoscope,
        colorClass: "teal",
        link: "/contact?type=professional",
        btnText: "Learn More"
    }
];

const ServiceCardItem = ({ service, index }: { service: any, index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            style={{ position: 'relative' }}
        >
            <BackgroundGradient animate={true}>
                <Link to={service.link} className="service-card" style={{ height: '100%', border: 'none' }}>
                    {/* Spotlight Effect */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '1.25rem',
                            background: useMotionTemplate`
                                radial-gradient(
                                  350px circle at ${mouseX}px ${mouseY}px,
                                  rgba(59, 130, 246, 0.1),
                                  transparent 80%
                                )
                            `,
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                    />

                    {/* Meteors logic could be added here for extra tech vibe */}
                    {index % 2 === 0 && (
                        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                            <Meteors number={10} />
                        </div>
                    )}

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div className={`service-icon-wrapper ${service.colorClass}`} style={{ margin: '0 auto 1.5rem' }}>
                            <service.icon size={36} strokeWidth={1.5} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0F172A' }}>{service.title}</h3>
                        <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1rem' }}>{service.description}</p>
                        <span className="service-link" style={{ fontSize: '0.95rem', color: '#2563EB', fontWeight: 600 }}>
                            {service.btnText} <ChevronRight size={18} />
                        </span>
                    </div>
                </Link>
            </BackgroundGradient>
        </motion.div>
    );
};

const Services = () => {
    return (
        <div className="services-page">
            <div className="services-hero" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 0 12rem', background: '#F8FAFC' }}>
                <AnimatedGradientBackground />
                <GridPattern />
                <BackgroundBeams />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '4rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
                    >
                        Comprehensive healthcare solutions designed for your comfort and convenience.
                    </motion.p>
                </div>

                {/* Decorative Wave */}
                <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: '100px', background: '#F8FAFC', clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }} />
            </div>

            <div className="container" style={{ marginTop: '-6rem', paddingBottom: '8rem' }}>
                <div className="services-grid" style={{ margin: 0 }}>
                    <AnimatePresence>
                        {servicesData.map((service, index) => (
                            <ServiceCardItem key={index} service={service} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Services;
