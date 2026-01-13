import { Link } from 'react-router-dom';
import { ServerCrash } from 'lucide-react';

const ServerError = () => {
    return (
        <div className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="container">
                <div style={{ marginBottom: '2rem', display: 'inline-block', padding: '2rem', background: '#F0F9FF', borderRadius: '50%' }}>
                    <ServerCrash size={64} className="text-primary" />
                </div>
                <h1 style={{ fontSize: '4rem', color: 'var(--primary-light)', fontWeight: 800, opacity: 0.5, margin: 0 }}>500</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Internal Server Error</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Server Error. We apologize and are fixing the problem. Please try again later.</p>
                <Link to="/" className="btn btn-primary">Go Back</Link>
            </div>
        </div>
    );
};

export default ServerError;
