import { useState, useEffect } from 'react';
import { Eye, Check, X } from 'lucide-react';
import api from '../../utils/api';
import Loading from '../../components/Loading';

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        if (!window.confirm(`Are you sure you want to mark this as ${status}?`)) return;
        try {
            await api.put(`/api/prescriptions/${id}`, { status });
            fetchPrescriptions(); // Refresh list
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="p-8"><Loading /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Prescription Requests</h1>
                <div className="text-sm text-gray-500">
                    {prescriptions.length} Records Found
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {prescriptions.map((p) => (
                            <tr key={p._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {p.user?.firstName} {p.user?.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">{p.user?.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                    {p.notes || '-'}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <button
                                        onClick={() => setSelectedImage(p.imageUrl)}
                                        className="text-primary hover:underline flex items-center gap-1"
                                    >
                                        <Eye size={16} /> View Image
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold
                                        ${p.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            p.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    {p.status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(p._id, 'Approved')}
                                                className="bg-green-100 text-green-700 p-2 rounded hover:bg-green-200 transition"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(p._id, 'Rejected')}
                                                className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200 transition"
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {prescriptions.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                    No prescription requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-3xl w-full bg-white rounded-lg p-2" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Prescription"
                            className="w-full h-auto max-h-[80vh] object-contain rounded"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prescriptions;
