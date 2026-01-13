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
        <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={{ maxWidth: '450px', width: '100%' }}>
                <div style={{ border: '1px solid var(--border)', padding: '2.5rem', borderRadius: '1rem', background: 'white' }}>
                    <div className="text-center mb-6">
                        <h2 className="mb-2">Welcome Back</h2>
                        <p className="text-muted">Login to manage your orders.</p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    style={{ paddingLeft: '2.5rem' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-icon-wrap" style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={{ paddingLeft: '2.5rem' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            {isLoading ? 'Logging in...' : 'Login'} <ArrowRight size={18} className="ml-2" />
                        </button>

                        <div className="text-center mt-4" style={{ fontSize: '0.9rem' }}>
                            Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Create Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
