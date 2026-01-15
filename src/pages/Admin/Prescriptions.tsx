import { useState, useEffect } from 'react';
import { Eye, Check, X, FileText, Trash2, Calendar, User } from 'lucide-react';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';

interface Prescription {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    imageUrl: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    notes?: string;
    createdAt: string;
}

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fetchPrescriptions = async () => {
        try {
            const { data } = await api.get('/api/prescriptions');
            setPrescriptions(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load prescriptions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        // Optimistic update for better UX
        const previousPrescriptions = [...prescriptions];
        setPrescriptions(prev => prev.map(p => p._id === id ? { ...p, status: status as any } : p));

        try {
            await api.put(`/api/prescriptions/${id}`, { status });
            toast.success(`Prescription marked as ${status}`);
        } catch (error) {
            console.error(error);
            setPrescriptions(previousPrescriptions); // Revert on error
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this prescription request?')) return;

        try {
            await api.delete(`/api/prescriptions/${id}`);
            setPrescriptions(prev => prev.filter(p => p._id !== id));
            toast.success('Prescription request deleted');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to delete request');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A' };
            case 'Approved': return { bg: '#DCFCE7', color: '#166534', border: '#BBF7D0' };
            case 'Rejected': return { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' };
            default: return { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' };
        }
    };

    if (loading) return <div className="p-8"><Loading /></div>;

    return (
        <div className="admin-page-container fade-in">
            <div className="admin-header">
                <div>
                    <h2 className="admin-title">Prescription Requests</h2>
                    <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Review and manage user uploaded prescriptions</p>
                </div>
                <div className="admin-actions">
                    <span className="coupon-tag">
                        <FileText size={16} />
                        {prescriptions.length} Requests
                    </span>
                </div>
            </div>

            <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
                {prescriptions.map((p) => {
                    const statusColors = getStatusColor(p.status);
                    return (
                        <div key={p._id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: p.status === 'Pending' ? '4px solid #F59E0B' : undefined }}>

                            {/* Header: User Info & Date */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: '#EFF6FF',
                                        color: '#3B82F6',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E293B', lineHeight: 1.2 }}>
                                            {p.user?.firstName} {p.user?.lastName}
                                        </h4>
                                        <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Calendar size={12} />
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '2rem',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    background: statusColors.bg,
                                    color: statusColors.color,
                                    border: `1px solid ${statusColors.border}`
                                }}>
                                    {p.status}
                                </span>
                            </div>

                            {/* Notes Section */}
                            <div style={{
                                background: '#F8FAFC',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                color: '#475569',
                                border: '1px solid #F1F5F9',
                                minHeight: '60px'
                            }}>
                                <span style={{ fontWeight: '600', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8' }}>Notes:</span>
                                {p.notes || <em style={{ color: '#cbd5e1' }}>No notes provided</em>}
                            </div>

                            {/* Actions Footer */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 'auto',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid #F1F5F9'
                            }}>
                                <button
                                    onClick={() => setSelectedImage(p.imageUrl)}
                                    style={{
                                        background: 'white',
                                        border: '1px solid #E2E8F0',
                                        color: '#3B82F6',
                                        padding: '0.4rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <Eye size={16} /> View Image
                                </button>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {p.status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(p._id, 'Approved')}
                                                style={{ padding: '0.4rem', borderRadius: '6px', background: '#DCFCE7', color: '#166534', border: 'none', cursor: 'pointer' }}
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(p._id, 'Rejected')}
                                                style={{ padding: '0.4rem', borderRadius: '6px', background: '#FEE2E2', color: '#991B1B', border: 'none', cursor: 'pointer' }}
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        style={{ padding: '0.4rem', borderRadius: '6px', background: '#F1F5F9', color: '#64748B', border: 'none', cursor: 'pointer' }}
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {prescriptions.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                        <div style={{ background: 'white', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <FileText size={32} color="#CBD5E1" />
                        </div>
                        <h3>No prescription requests</h3>
                        <p>User uploaded prescriptions will appear here.</p>
                    </div>
                )}
            </div>

            {/* Image Modal - Kept same logic but slightly enhanced style */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl animate-scale-in"
                        onClick={e => e.stopPropagation()}
                        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Prescription Image</h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div style={{ padding: '1rem', overflow: 'auto', background: '#f8fafc', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {selectedImage.includes('[object Object]') ? (
                                <div className="p-8 text-center bg-red-50 text-red-500 rounded">
                                    <p><strong>Image Upload Error</strong></p>
                                    <p className="text-sm">This record was saved incorrectly. Please delete it.</p>
                                </div>
                            ) : (
                                <img
                                    src={selectedImage.startsWith('http') ? selectedImage : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')}/${selectedImage.replace(/^\/+/, '')}`}
                                    alt="Prescription"
                                    style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prescriptions;
