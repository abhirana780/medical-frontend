
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { X, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Compare = () => {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const { addToCart } = useCart();

    if (compareList.length === 0) {
        return (
            <div className="section container text-center">
                <h2>Product Comparison</h2>
                <p className="mb-8" style={{ color: '#64748B' }}>You haven't added any products to compare yet.</p>
                <Link to="/catalog" className="btn btn-primary">Browse Catalog</Link>
            </div>
        );
    }

    return (
        <div className="section container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Compare Products</h2>
                <button onClick={clearCompare} className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                    Clear Comparison
                </button>
            </div>

            <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
                <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '1.5rem', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', width: '200px' }}>Features</th>
                            {compareList.map(product => (
                                <th key={product._id} style={{ padding: '1.5rem', background: 'white', borderBottom: '2px solid #e2e8f0', minWidth: '250px', position: 'relative' }}>
                                    <button
                                        onClick={() => removeFromCompare(product._id)}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: '#ffe4e6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', cursor: 'pointer' }}
                                    >
                                        <X size={14} />
                                    </button>
                                    <img src={product.image} alt={product.name} style={{ width: '120px', height: '120px', objectFit: 'contain', margin: '0 auto 1rem' }} />
                                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem', height: '3rem', overflow: 'hidden' }}>{product.name}</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb' }}>${product.price ? product.price.toFixed(2) : 'N/A'}</div>
                                    <button
                                        className="btn btn-primary"
                                        style={{ marginTop: '1rem', width: '100%', fontSize: '0.9rem' }}
                                        onClick={() => {
                                            if (product.countInStock > 0) {
                                                addToCart({ ...product, quantity: 1 });
                                                toast.success("Added to cart");
                                            } else {
                                                toast.error("Out of Stock");
                                            }
                                        }}
                                        disabled={product.countInStock === 0}
                                    >
                                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </th>
                            ))}
                            {compareList.length < 3 && Array(3 - compareList.length).fill(0).map((_, i) => (
                                <th key={i} style={{ padding: '1.5rem', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', minWidth: '250px' }}>
                                    <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cbd5e1', borderRadius: '0.5rem', color: '#94a3b8' }}>
                                        <div style={{ marginBottom: '1rem', fontWeight: 500 }}>Add Product</div>
                                        <Link to="/catalog" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Browse</Link>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: 'Rating', key: 'rating', render: (val: any) => <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}><span style={{ fontWeight: 700 }}>{val}</span> <span>/ 5</span></div> },
                            { label: 'Category', key: 'category' },
                            { label: 'Brand', key: 'brand', fallback: 'Scott\'s Medical' },
                            { label: 'Availability', key: 'countInStock', render: (val: any) => val > 0 ? <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}><Check size={16} /> In Stock</span> : <span style={{ color: '#dc2626' }}>Out of Stock</span> },
                            { label: 'Description', key: 'description', render: (val: any) => <div style={{ fontSize: '0.9rem', lineHeight: 1.5, maxHeight: '100px', overflow: 'hidden', textAlign: 'left' }}>{val?.substring(0, 120)}...</div> }
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#64748B', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>{row.label}</td>
                                {compareList.map(product => (
                                    <td key={product._id} style={{ padding: '1rem 1.5rem', textAlign: 'center', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                                        {row.render ? row.render(product[row.key as keyof typeof product]) : ((product as any)[row.key] || row.fallback || '-')}
                                    </td>
                                ))}
                                {compareList.length < 3 && Array(3 - compareList.length).fill(0).map((_, i) => (
                                    <td key={i} style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Compare;
