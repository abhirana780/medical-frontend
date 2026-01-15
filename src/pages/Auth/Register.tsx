import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const { data } = await api.post('/api/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            login(data);
            alert("Registration successful!");
            navigate('/account');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            padding: '2rem'
        }}>
            <div className="container" style={{ maxWidth: '1000px', width: '100%', padding: 0 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr minmax(300px, 1fr)',
                    background: 'white',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}>

                    {/* Left Side - Form */}
                    <div style={{ padding: '3rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="text-left mb-6">
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Create Account</h2>
                            <p style={{ color: '#64748b' }}>Join Scott's Medical Supply for faster checkout.</p>
                        </div>

                        {error && (
                            <div style={{
                                background: '#FEE2E2',
                                color: '#991B1B',
                                border: '1px solid #FECACA',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '0.9rem'
                            }}>
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        <form onSubmit={handleRegister}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="John"
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Doe"
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-5" style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Email Address</label>
                                <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-5" style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Password</label>
                                <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-5" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>Confirm Password</label>
                                <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    background: '#2563eb',
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s',
                                    marginTop: '0.5rem',
                                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {isLoading ? 'Creating Account...' : 'Get Started'} <ArrowRight size={20} />
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
                                Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Hero / Image */}
                    <div className="login-hero" style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        textAlign: 'center'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                                Join the Network
                            </h2>
                            <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '300px', margin: '0 auto 2rem' }}>
                                Create an account to unlock exclusive pricing, fast shipping, and easy reordering.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', backdropFilter: 'blur(5px)' }}>
                                    🚀 Same-Day Shipping
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', backdropFilter: 'blur(5px)' }}>
                                    🛡️ Secure Payments
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', backdropFilter: 'blur(5px)' }}>
                                    🩺 Professional Grade
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CSS for Responsive Layout */}
            <style>{`
                @media (max-width: 768px) {
                    .container > div {
                        grid-template-columns: 1fr !important;
                    }
                    .login-hero {
                        order: -1;
                        padding: 2rem !important;
                        min-height: 200px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;
