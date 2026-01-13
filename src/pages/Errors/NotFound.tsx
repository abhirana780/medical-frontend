import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="container">
                <h1 style={{ fontSize: '6rem', color: 'var(--primary-light)', fontWeight: 800, opacity: 0.5 }}>404</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Page not found</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The page you are looking for might have been removed or temporarily unavailable.</p>
                <Link to="/" className="btn btn-primary">Back to Homepage</Link>
            </div>
        </div>
    );
};

export default NotFound;
