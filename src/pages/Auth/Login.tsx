import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Make API call to backend
            const { data } = await api.post('/api/auth/login', {
                email,
                password
            });

            // If successful, update context and redirect
            login(data);
            navigate(data.isAdmin ? '/admin/dashboard' : '/account');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
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
                    gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr',
                    background: 'white',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}>

                    {/* Left Side - Hero / Image */}
                    <div className="login-hero" style={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '2rem', backdropFilter: 'blur(10px)', marginBottom: '2rem' }}>
                                <span style={{ fontWeight: 700 }}>Scott's</span> Medical Supply
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
                                Welcome Back,<br />Partner!
                            </h2>
                            <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '300px' }}>
                                Access your dashboard to manage orders, track shipments, and view your history.
                            </p>
                        </div>

                        <div style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem', opacity: 0.8 }}>
                            &copy; {new Date().getFullYear()} Scott's Medical. Secure & Encrypted.
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div style={{ padding: '3rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="text-left mb-8">
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Login</h2>
                            <p style={{ color: '#64748b' }}>Please enter your details to sign in.</p>
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

                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-5">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>Email Address</label>
                                <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            transition: 'all 0.2s',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-5">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>Password</label>
                                <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            transition: 'all 0.2s',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#64748b' }}>
                                    <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer' }} />
                                    Remember me
                                </label>
                                <Link to="/forgot-password" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
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
                                {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight size={20} />
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
                                Don't have an account? <Link to="/register" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>Create Account</Link>
                            </div>
                        </form>
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
                        padding: 2rem !important;
                        min-height: 200px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;
