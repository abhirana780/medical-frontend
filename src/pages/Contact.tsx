import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../utils/api';

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
        <div className="section">
            <div className="container">
                <h1 className="text-center mb-12">Contact Us</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Info */}
                    <div>
                        <h2 className="mb-8">Get In Touch</h2>
                        <p className="mb-8 text-muted">
                            Have questions about our products or need assistance with an order?
                            Our team is here to help you find the right medical solutions.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                    <Phone color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem' }}>Phone</h3>
                                    <p className="text-muted">473-440-7030</p>
                                    <p className="text-muted">Mon-Fri 9am-6pm</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                    <Mail color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem' }}>Email</h3>
                                    <p className="text-muted">contact@scottsmedical.com</p>
                                    <p className="text-muted">sales@scottsmedical.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                    <MapPin color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem' }}>Location</h3>
                                    <p className="text-muted">Scott's Medical Supply</p>
                                    <p className="text-muted">Grenada</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow)' }}>
                        <h3 className="mb-4">Send us a Message</h3>

                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#16A34A', background: '#DCFCE7', borderRadius: '0.5rem' }}>
                                <CheckCircle className="mx-auto mb-2" />
                                <p>Thank you! Your message has been sent.</p>
                                <button onClick={() => setStatus('idle')} className="btn btn-outline btn-xs mt-4">Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div style={{ marginBottom: '1rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <AlertCircle size={16} /> Failed to send message. Try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
