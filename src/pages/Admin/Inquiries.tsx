import { useState, useEffect } from 'react';
import { Mail, Clock, Trash2 } from 'lucide-react';
import api from '../../utils/api';
import Loading from '../../components/Loading';

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    message: string;
    status: 'New' | 'Read' | 'Replied';
    createdAt: string;
}

const Inquiries = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            const { data } = await api.get('/api/inquiries');
            setInquiries(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await api.put(`/api/inquiries/${id}`, { status });
            // Optimistic update or refetch
            setInquiries(prev => prev.map(inv => inv._id === id ? { ...inv, status: status as any } : inv));
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            await api.delete(`/api/inquiries/${id}`);
            setInquiries(prev => prev.filter(i => i._id !== id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete inquiry');
        }
    };

    if (loading) return <div className="p-8"><Loading /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Customer Inquiries</h1>
                <div className="text-sm text-gray-500">
                    {inquiries.length} Messages
                </div>
            </div>

            <div className="grid gap-4">
                {inquiries.map((inquiry) => (
                    <div key={inquiry._id} className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${inquiry.status === 'New' ? 'border-primary border-l-4' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    {inquiry.name}
                                    {inquiry.status === 'New' && <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>}
                                </h3>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    <Mail size={14} /> {inquiry.email}
                                    <span className="mx-1">•</span>
                                    <Clock size={14} /> {new Date(inquiry.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={inquiry.status}
                                    onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                >
                                    <option value="New">New</option>
                                    <option value="Read">Read</option>
                                    <option value="Replied">Replied</option>
                                </select>
                                <button
                                    onClick={() => handleDelete(inquiry._id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-gray-700 whitespace-pre-wrap">
                            {inquiry.message}
                        </div>
                    </div>
                ))}

                {inquiries.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed">
                        <Mail size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No inquiries found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inquiries;
