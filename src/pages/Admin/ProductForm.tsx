import { useState, useEffect } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { CATEGORIES } from '../../data/categories';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID if editing
    const isEditMode = !!id;

    const [isLoading, setIsLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [uploading, setUploading] = useState(false); // Make sure this is declared
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        countInStock: '',
        image: '',
        isNewArrival: true,
        isSale: false
    });

    const categories = CATEGORIES.map(c => c.name);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                setFetchLoading(true);
                try {
                    const { data } = await api.get(`/api/products/${id}`);
                    setFormData({
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        category: data.category,
                        countInStock: data.countInStock,
                        image: data.image,
                        isNewArrival: data.isNewArrival || false,
                        isSale: data.isSale || false
                    });
                } catch (error) {
                    console.error("Failed to fetch product", error);
                    alert("Could not pull product details.");
                } finally {
                    setFetchLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await api.post('/api/upload', formDataUpload, config);

            // Prepend baseURL properly
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            setFormData(prev => ({ ...prev, image: `${baseURL}${data.image}` }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert('Image upload failed!');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditMode) {
                await api.put(`/api/products/${id}`, formData);
                alert('Product Updated Successfully!');
            } else {
                await api.post('/api/products', formData);
                alert('Product Created Successfully!');
            }
            navigate('/admin/products');
        } catch (error: any) {
            console.error('Error saving product:', error);
            alert(error.response?.data?.message || 'Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    if (fetchLoading) return <div style={{ padding: '4rem' }}><Loading /></div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/admin/products')} className="btn btn-outline p-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Electric Wheelchair"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock Quantity</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Product description..."
                            style={{ minHeight: '120px' }}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Product Image</label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Image URL or upload file"
                                required
                                style={{ flex: 1 }}
                            />
                            <label className="btn btn-outline" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px', marginBottom: 0 }}>
                                <Upload size={16} />
                                {uploading ? 'Uploading...' : 'Upload'}
                                <input type="file" id="image-file" onChange={handleFileChange} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                            <small className="text-muted">Enter a direct image link or upload from your device.</small>
                        </div>
                        {formData.image && (
                            <img src={formData.image} alt="Preview" style={{ marginTop: '1rem', height: '100px', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                        )}
                    </div>

                    <div className="checkbox-group mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isNewArrival"
                                checked={formData.isNewArrival}
                                onChange={handleChange}
                            />
                            Mark as New Arrival
                        </label>
                    </div>

                    <div className="checkbox-group mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isSale"
                                checked={formData.isSale}
                                onChange={handleChange}
                            />
                            On Sale
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button className="btn btn-primary" type="submit" disabled={isLoading || uploading}>
                            {isLoading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Save Product')}
                        </button>
                        <button className="btn btn-outline" type="button" onClick={() => navigate('/admin/products')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
