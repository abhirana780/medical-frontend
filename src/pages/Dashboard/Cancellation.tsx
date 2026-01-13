import { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cancellation = () => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="success-screen">
                <div className="check-big">
                    <Check size={32} strokeWidth={3} />
                </div>
                <h2 className="mb-4">Your Cancellation was successful</h2>
                <div style={{ maxWidth: '500px', margin: '0 auto 2rem', background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', textAlign: 'left', display: 'flex', gap: '1rem' }}>
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=150" alt="Product" style={{ width: '60px', borderRadius: '4px' }} />
                    <div>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Olay Retinol 24 Night Serum</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: 1</span>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>$25.00</div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="dash-title">Request for cancellation</h2>

            <div className="order-card-row" style={{ marginBottom: '2rem' }}>
                <div className="order-info-left">
                    <div style={{ paddingTop: '3px' }}>
                        <input type="checkbox" checked readOnly style={{ width: '18px', height: '18px' }} />
                    </div>
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200" alt="Product" className="order-thumb" />
                    <div className="order-details-text">
                        <h4>Olay Retinol 24 Night Serum</h4>
                        <div className="order-meta">
                            <span>Sold by: MedPlus Pharmacy</span>
                        </div>
                        <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>$25.00</div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="cancel-reason-box">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Reason for cancellation*</label>
                    <select className="reason-select">
                        <option>Choose a reason...</option>
                        <option>Ordered by mistake</option>
                        <option>Found cheaper elsewhere</option>
                        <option>Shipping time is too long</option>
                        <option>Other</option>
                    </select>

                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Additional comments</label>
                    <textarea className="cancel-comment" placeholder="Please provide any additional details..."></textarea>
                </div>

                <div className="checkbox-group" style={{ marginBottom: '2rem' }}>
                    <input type="checkbox" id="confirm-cancel" required />
                    <label htmlFor="confirm-cancel">I confirm that I want to cancel this item.</label>
                </div>

                <button type="submit" className="btn btn-primary">Submit Request</button>
            </form>
        </div>
    );
};

export default Cancellation;
