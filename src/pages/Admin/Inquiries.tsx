import { useState, useEffect } from 'react';
import { Mail, Clock, Trash2, MessageSquare } from 'lucide-react';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';

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
            toast.error('Failed to fetch inquiries');
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
            setInquiries(prev => prev.map(inv => inv._id === id ? { ...inv, status: status as any } : inv));
            toast.success(`Status updated to ${status}`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            await api.delete(`/api/inquiries/${id}`);
            setInquiries(prev => prev.filter(i => i._id !== id));
            toast.success('Inquiry deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete inquiry');
        }
    };

    if (loading) return <div className="p-8"><Loading /></div>;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return { bg: '#DBEAFE', color: '#1E40AF', border: '#BFDBFE' };
            case 'Read': return { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' };
            case 'Replied': return { bg: '#DCFCE7', color: '#166534', border: '#BBF7D0' };
            default: return { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' };
        }
    };

    return (
        <div className="admin-page-container fade-in">
            <div className="admin-header">
                <div>
                    <h2 className="admin-title">Customer Inquiries</h2>
                    <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Manage incoming support messages</p>
                </div>
                <div className="admin-actions">
                    <span className="coupon-tag">
                        <MessageSquare size={16} />
                        {inquiries.length} Messages
                    </span>
                </div>
            </div>

            <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                {inquiries.map((inquiry) => {
                    const statusColors = getStatusColor(inquiry.status);
                    return (
                        <div key={inquiry._id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: inquiry.status === 'New' ? '4px solid #3B82F6' : undefined }}>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)'
                                    }}>
                                        {inquiry.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', lineHeight: 1.2 }}>{inquiry.name}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748b', marginTop: '0.1rem' }}>
                                            <Mail size={12} /> {inquiry.email}
                                        </div>
                                    </div>
                                </div>

                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '2rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    background: statusColors.bg,
                                    color: statusColors.color,
                                    border: `1px solid ${statusColors.border}`
                                }}>
                                    {inquiry.status}
                                </span>
                            </div>

                            {/* Message Body */}
                            <div style={{
                                background: '#F8FAFC',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #F1F5F9',
                                flex: 1,
                                fontSize: '0.9rem',
                                color: '#334155',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {inquiry.message}
                            </div>

                            {/* Footer / Actions */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid #F1F5F9',
                                marginTop: 'auto'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                    <Clock size={14} />
                                    {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        value={inquiry.status}
                                        onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                                        style={{
                                            padding: '0.35rem 0.5rem',
                                            borderRadius: '6px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '0.8rem',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            background: 'white'
                                        }}
                                    >
                                        <option value="New">Mark as New</option>
                                        <option value="Read">Mark as Read</option>
                                        <option value="Replied">Mark as Replied</option>
                                    </select>

                                    <button
                                        onClick={() => handleDelete(inquiry._id)}
                                        style={{
                                            background: '#FEF2F2',
                                            color: '#EF4444',
                                            border: '1px solid #FECACA',
                                            padding: '0.35rem 0.5rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                        title="Delete Inquiry"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {inquiries.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                        <div style={{ background: 'white', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <MessageSquare size={32} color="#CBD5E1" />
                        </div>
                        <h3>No inquiries found</h3>
                        <p>Incoming messages from customers will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inquiries;
