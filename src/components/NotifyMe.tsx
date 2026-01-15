
import { useState } from 'react';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NotifyMe = ({ productId }: { productId: string }) => {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        console.log("Notify request for:", productId, "Email:", email);
        // await api.post('/api/notify', { email, productId });
        toast.success("We'll notify you when this item is back in stock!");
        setOpen(false);
        setEmail('');
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="btn btn-outline"
                style={{ width: '100%', borderColor: '#f59e0b', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
                <Bell size={20} /> Notify Me When Available
            </button>
        );
    }

    return (
        <div style={{ padding: '1rem', border: '1px solid #f59e0b', borderRadius: '0.5rem', background: '#fffbeb' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#92400e', fontSize: '0.9rem' }}>Get notified when back in stock</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ flexGrow: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #fcd34d' }}
                />
                <button type="submit" className="btn btn-primary" style={{ background: '#d97706', borderColor: '#d97706', padding: '0.5rem 1rem' }}>
                    Notify
                </button>
            </form>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: '#92400e', marginTop: '0.5rem', textDecoration: 'underline', cursor: 'pointer' }}>
                Cancel
            </button>
        </div>
    );
};

export default NotifyMe;
