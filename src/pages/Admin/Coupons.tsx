import { useState, useEffect } from 'react';
import { Tag, Trash2, Plus, Calendar } from 'lucide-react';
import api from '../../utils/api';
import Loading from '../../components/Loading';

interface Coupon {
    _id: string;
    code: string;
    discountPercentage: number;
    expiryDate: string;
    isActive: boolean;
}

const Coupons = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        code: '',
        discountPercentage: '',
        expiryDate: ''
    });

    const fetchCoupons = async () => {
        try {
            const { data } = await api.get('/api/coupons');
            setCoupons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) return;
        try {
            await api.delete(`/api/coupons/${id}`);
            setCoupons(prev => prev.filter(c => c._id !== id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete coupon');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/api/coupons', formData);
            setCoupons([data, ...coupons]);
            setIsCreating(false);
            setFormData({ code: '', discountPercentage: '', expiryDate: '' });
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to create coupon');
        }
    };

    if (loading) return <div className="p-8"><Loading /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Coupons</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className={isCreating ? "btn-cancel" : "btn-primary"}
                >
                    {isCreating ? 'Cancel' : <><Plus size={18} /> Create New</>}
                </button>
            </div>

            {isCreating && (
                <div className="coupon-form-card">
                    <h3 className="form-header">Add New Coupon</h3>
                    <form onSubmit={handleCreate} className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Coupon Code</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. SUMMER20"
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ width: '140px' }}>
                            <label className="form-label">Discount (%)</label>
                            <input
                                type="number"
                                min="1" max="100"
                                className="form-input"
                                placeholder="20"
                                value={formData.discountPercentage}
                                onChange={e => setFormData({ ...formData, discountPercentage: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Expiry Date</label>
                            <input
                                type="date"
                                className="form-input"
                                value={formData.expiryDate}
                                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ marginBottom: '2px' }}>
                            Save Coupon
                        </button>
                    </form>
                </div>
            )}

            <div className="admin-grid">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="premium-card group">
                        <div className="card-decoration transition-transform group-hover:scale-110"></div>

                        <div className="card-content">
                            <div className="card-header-row">
                                <div className="coupon-tag">
                                    <Tag size={14} />
                                    {coupon.code}
                                </div>
                                <button
                                    onClick={() => handleDelete(coupon._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-0 cursor-pointer p-0"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="coupon-discount">
                                <div className="discount-amount">{coupon.discountPercentage}% <span style={{ fontSize: '1rem', color: '#64748B' }}>OFF</span></div>
                                <span className="discount-label">Discount On All Products</span>
                            </div>

                            <div className="card-footer-row">
                                <div className={`status-indicator ${new Date(coupon.expiryDate) > new Date() ? 'active' : 'expired'}`}>
                                    <div className={`status-dot ${new Date(coupon.expiryDate) > new Date() ? 'active' : 'expired'}`}></div>
                                    <span>{new Date(coupon.expiryDate) > new Date() ? 'Active' : 'Expired'}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#94A3B8' }}>
                                    <Calendar size={14} />
                                    <span>{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {coupons.length === 0 && !isCreating && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: '#F8FAFC', borderRadius: '1rem', border: '2px dashed #E2E8F0', color: '#64748B' }}>
                        <Tag size={48} style={{ margin: '0 auto 1rem auto', color: '#CBD5E1' }} />
                        <p>No coupons found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coupons;

