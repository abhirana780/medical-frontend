import { useState, useEffect } from 'react';
import { Save, AlertCircle, Search } from 'lucide-react';
import api from '../../utils/api';
import Loading from '../../components/Loading';

interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    countInStock: number;
    inStock: boolean;
    sku?: string;
}

const BulkInventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [updates, setUpdates] = useState<{ [key: string]: Partial<Product> }>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/products?limit=1000'); // Fetch all or paginated? Assuming reasonable count.
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (id: string, field: keyof Product, value: any) => {
        setUpdates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));

        // Optimistic UI updates
        setProducts(prev => prev.map(p => {
            if (p._id === id) {
                return { ...p, [field]: value };
            }
            return p;
        }));
    };

    const handleSave = async () => {
        const productIdsToUpdate = Object.keys(updates);
        if (productIdsToUpdate.length === 0) return;

        setIsSaving(true);
        try {
            const promises = productIdsToUpdate.map(id => {
                return api.put(`/api/products/${id}`, updates[id])
                    .then(() => ({ status: 'fulfilled', id }))
                    .catch((err) => ({ status: 'rejected', id, error: err }));
            });

            const results = await Promise.all(promises);

            const rejected = results.filter((r: any) => r.status === 'rejected');
            const fulfilled = results.filter((r: any) => r.status === 'fulfilled');

            if (rejected.length > 0) {
                console.error('Failed updates:', rejected);
                const firstError = rejected[0]?.error?.response?.data?.message || rejected[0]?.error?.message || 'Unknown error';
                alert(`Updated ${fulfilled.length} products. Failed to update ${rejected.length} products.\nFirst Error: ${firstError}`);
            } else {
                alert('All products updated successfully!');
            }

            // Remove fulfilled updates from state
            const remainingUpdates = { ...updates };
            fulfilled.forEach((r: any) => {
                delete remainingUpdates[r.id];
            });
            setUpdates(remainingUpdates);

            fetchProducts();
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div className="p-8"><Loading /></div>;

    const hasChanges = Object.keys(updates).length > 0;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Bulk Inventory Management</h1>
                    <p className="text-gray-500">Quickly update stock levels and prices.</p>
                </div>
                {hasChanges && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn btn-primary flex items-center gap-2"
                        style={{ background: '#2563eb', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', color: 'white' }}
                    >
                        <Save size={18} />
                        {isSaving ? 'Saving...' : `Save ${Object.keys(updates).length} Changes`}
                    </button>
                )}
            </div>

            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Search by name or brand..."
                    className="w-full p-2 pl-10 border rounded"
                    style={{ paddingLeft: '2.5rem', height: '40px', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            <div className="modern-table-container">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th style={{ textAlign: 'right', width: '150px' }}>Price ($)</th>
                            <th style={{ textAlign: 'right', width: '150px' }}>Stock</th>
                            <th style={{ textAlign: 'center', width: '100px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((p) => {
                            const isChanged = updates[p._id];
                            return (
                                <tr key={p._id} style={{ backgroundColor: isChanged ? '#EFF6FF' : 'transparent' }}>
                                    <td>
                                        <div style={{ fontWeight: 500, color: '#0F172A' }}>{p.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>{p._id.slice(-8)}</div>
                                    </td>
                                    <td>
                                        {p.brand ? <span style={{ background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{p.brand}</span> : '-'}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <input
                                            type="number"
                                            className="table-input"
                                            value={p.price}
                                            onChange={(e) => handleInputChange(p._id, 'price', Number(e.target.value))}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <input
                                            type="number"
                                            className="table-input"
                                            style={{
                                                borderColor: p.countInStock < 10 ? '#FECACA' : '#E2E8F0',
                                                backgroundColor: p.countInStock < 10 ? '#FEF2F2' : 'white',
                                                color: p.countInStock < 10 ? '#DC2626' : 'inherit'
                                            }}
                                            value={p.countInStock}
                                            onChange={(e) => handleInputChange(p._id, 'countInStock', Number(e.target.value))}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {p.countInStock < 10 ? (
                                            <div className="low-stock-alert" title="Low Stock">
                                                <AlertCircle size={16} />
                                            </div>
                                        ) : (
                                            <div className="good-stock-dot"></div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BulkInventory;
