import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Send, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import { AnimatedGradientBackground, GridPattern } from '../components/ui/AnimatedBackground';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setStatus('loading');
            await api.post('/api/inquiries', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Submission error", error);
            setStatus('error');
        }
    };

    return (
        <div className="contact-page">
            {/* Left Side: Cinematic Info */}
            <div className="contact-left">
                <AnimatedGradientBackground />
                <GridPattern />
                <BackgroundBeams />

                <div className="contact-content-wrapper">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="contact-title">Let’s Start a Conversation</h1>
                        <p className="contact-desc">
                            We’re here to help you find the best medical supplies. Reach out and let’s discuss how we can support your healthcare needs.
                        </p>
                    </motion.div>

                    <div className="info-cards-stack">
                        {[
                            { icon: Phone, title: "Call Us", value: "+1 473-440-7030", desc: "Mon-Fri 9am-6pm" },
                            { icon: Mail, title: "Email Us", value: "contact@scottsmedical.com", desc: "We reply within 24 hours" },
                            { icon: MapPin, title: "Our Location", value: "St. George's, Grenada", desc: "Scott's Medical Supply" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                className="minimal-info-card"
                            >
                                <div className="icon-box">
                                    <item.icon size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'white' }}>{item.title}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>{item.value}</p>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>{item.desc}</p>
                                </div>
                                <ArrowRight size={16} color="#334155" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: High-End Form */}
            <div className="contact-right">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}
                >
                    <h2 className="contact-form-title">Send a Message</h2>
                    <p className="contact-form-subtitle">Fill out the form below and we'll get back to you shortly.</p>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '3rem 0' }}
                            >
                                <div style={{ width: '80px', height: '80px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <CheckCircle size={40} color="#16A34A" />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Success!</h3>
                                <p style={{ color: '#64748B', marginBottom: '2rem' }}>Your inquiry has been submitted successfully.</p>
                                <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ borderRadius: '1rem' }}>
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Full Name"
                                        className="floating-label-input"
                                    />
                                </div>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email Address"
                                        className="floating-label-input"
                                    />
                                </div>
                                <div className="input-container">
                                    <textarea
                                        rows={5}
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className="floating-label-input"
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ marginBottom: '1.5rem', color: '#EF4444', background: '#FEF2F2', padding: '1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <AlertCircle size={18} /> Something went wrong. Please try again.
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="submit-btn-premium"
                                >
                                    {status === 'loading' ? 'Processing...' : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
