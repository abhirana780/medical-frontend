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
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Coupons</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded shadow hover:bg-opacity-90 transition"
                >
                    {isCreating ? 'Cancel' : <><Plus size={18} /> Create New</>}
                </button>
            </div>

            {isCreating && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                    <h3 className="font-semibold mb-4">Add New Coupon</h3>
                    <form onSubmit={handleCreate} className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="e.g. SUMMER20"
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                required
                            />
                        </div>
                        <div className="w-[150px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                            <input
                                type="number"
                                min="1" max="100"
                                className="w-full p-2 border rounded"
                                placeholder="20"
                                value={formData.discountPercentage}
                                onChange={e => setFormData({ ...formData, discountPercentage: e.target.value })}
                                required
                            />
                        </div>
                        <div className="w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={formData.expiryDate}
                                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                            Save Coupon
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Tag size={18} className="text-secondary" />
                                <span className="font-bold text-lg text-secondary">{coupon.code}</span>
                            </div>
                            <div className="text-2xl font-bold mb-1">{coupon.discountPercentage}% OFF</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar size={14} /> Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                            </div>
                            <div className={`text-xs mt-2 px-2 py-0.5 rounded-full inline-block ${new Date(coupon.expiryDate) > new Date() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {new Date(coupon.expiryDate) > new Date() ? 'Active' : 'Expired'}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(coupon._id)}
                            className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 transition"
                            title="Delete"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}

                {coupons.length === 0 && !isCreating && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No coupons found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coupons;
