import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Activity } from 'lucide-react';
import { WaveAnimation, FloatingParticles } from './ui/AnimatedBackground';
import { BackgroundBeams } from './ui/BackgroundBeams';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Shop",
            links: [
                { name: "Mobility", path: "/catalog?cat=mobility" },
                { name: "Respiratory", path: "/catalog?cat=respiratory" },
                { name: "Diabetes Care", path: "/catalog?cat=diabetic" },
            ]
        },
        {
            title: "Services",
            links: [
                { name: "Professional Services", path: "/services" },
                { name: "Patient Inquiry", path: "/inquiry" },
                { name: "Order Tracking", path: "/account/orders" },
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Contact Us", path: "/contact" },
                { name: "Shipping Policy", path: "/shipping-policy" },
                { name: "Returns Policy", path: "/returns" },
                { name: "FAQ", path: "/faq" },
            ]
        }
    ];

    return (
        <footer className="footer-container">
            {/* Wave Animation at Top */}
            <div className="footer-wave-wrapper">
                <WaveAnimation />
            </div>

            <div className="footer-main">
                {/* Background Effects */}
                <BackgroundBeams />
                <FloatingParticles />

                <div className="container footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="footer-logo">
                                <Activity className="logo-icon" />
                                <h3>Scott's Medical Supply</h3>
                            </div>
                            <p className="footer-desc">
                                Providing premium medical equipment and supplies to the Caribbean with care and excellence for over a decade.
                            </p>
                            <div className="social-links">
                                <a href="#" className="social-icon"><Facebook size={18} /></a>
                                <a href="#" className="social-icon"><Twitter size={18} /></a>
                                <a href="#" className="social-icon"><Instagram size={18} /></a>
                                <a href="#" className="social-icon"><Linkedin size={18} /></a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Links */}
                    {footerSections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            className="footer-nav-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <h4>{section.title}</h4>
                            <ul>
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path}>
                                            <ArrowRight size={14} className="link-arrow" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Contact Info Section */}
                    <motion.div
                        className="footer-contact"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h4>Get in Touch</h4>
                        <div className="contact-items">
                            <div className="contact-item">
                                <Phone size={18} className="contact-icon" />
                                <span>473-440-7030</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>contact@scottsmedical.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <span>St. George's, Grenada</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container bottom-content">
                    <p>&copy; {currentYear} Scott's Medical Supply. All Rights Reserved.</p>
                    <p className="powered-by">
                        Powered by <span className="highlight-text">Wipronix Technologies</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
