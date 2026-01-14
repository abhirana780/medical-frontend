import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../utils/api';
import './UploadPrescription.css';
import { useNavigate } from 'react-router-dom';

const UploadPrescription = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        try {
            setUploading(true);
            setError('');

            // 1. Upload Image
            const formData = new FormData();
            formData.append('image', file);

            const uploadRes = await api.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imageUrl = uploadRes.data.image;

            // 2. Create Prescription Record
            await api.post('/api/prescriptions', { imageUrl });

            setSuccess(true);
            setTimeout(() => {
                navigate('/account/medical-history'); // Or dashboard
            }, 2000);

        } catch (err: any) {
            console.error(err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="section upload-page">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="mb-4">Upload Prescription</h1>
                    <p className="text-muted">Please attach a valid prescription to proceed with your order.</p>
                </div>

                {success ? (
                    <div className="text-center" style={{ padding: '3rem', background: '#DCFCE7', borderRadius: '1rem', border: '1px solid #86EFAC', maxWidth: '600px', margin: '0 auto' }}>
                        <CheckCircle size={48} className="text-green-600 mb-4 mx-auto" />
                        <h2 className="text-green-800 mb-2">Upload Successful!</h2>
                        <p className="text-green-700">Your prescription has been submitted for review.</p>
                    </div>
                ) : (
                    <>
                        <div className="upload-box-container">
                            <div className="upload-zone" style={{ border: error ? '2px dashed #EF4444' : '' }}>
                                {preview ? (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                                        <button onClick={() => { setFile(null); setPreview(''); }} className="btn btn-outline btn-xs mt-2">Remove</button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={48} className="mb-4 text-primary" />
                                        <h3>Upload Prescription</h3>
                                        <p className="text-muted mb-4">Click below to browse</p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />

                                {!preview && (
                                    <label htmlFor="file-upload" className="btn btn-primary cursor-pointer">
                                        Select File
                                    </label>
                                )}

                                {preview && (
                                    <button
                                        className="btn btn-primary mt-4"
                                        onClick={handleUpload}
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Uploading...' : 'Submit Prescription'}
                                    </button>
                                )}

                                {error && (
                                    <div className="mt-4 text-red-500 flex items-center justify-center gap-2">
                                        <AlertCircle size={16} /> {error}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Valid Prescription Guide */}
                        <div className="guide-section">
                            <h3 className="text-center mb-8">Valid Prescription</h3>
                            <p className="text-center text-muted mb-8">For an order to be processed, the uploaded prescription must include specific information.</p>

                            <div className="guide-icons">
                                <div className="g-item">
                                    <div className="g-icon">🩺</div>
                                    <span>Doctor Details</span>
                                </div>
                                <div className="g-item">
                                    <div className="g-icon">📅</div>
                                    <span>Date</span>
                                </div>
                                <div className="g-item">
                                    <div className="g-icon">👤</div>
                                    <span>Patient Name</span>
                                </div>
                                <div className="g-item">
                                    <div className="g-icon">💊</div>
                                    <span>Medicine Info</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadPrescription;
