import { Star, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewProduct = () => {
    return (
        <div className="section" style={{ backgroundColor: '#F8FAFC' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="mb-4">Thank you for your review!</h1>
                    <p className="text-muted">Your feedback helps others make better choices.</p>
                    <Link to="/" className="btn btn-primary mt-4">Continue Shopping</Link>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=150" alt="Product" style={{ width: '100px', height: '100px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '8px' }} />
                        <div>
                            <h4>Olay Retinol 24 Night Serum</h4>
                            <p className="text-muted">Rate this product</p>
                            <div style={{ display: 'flex', gap: '0.5rem', color: '#CBD5E1', cursor: 'pointer' }}>
                                <Star size={24} fill="#FBBF24" color="#FBBF24" />
                                <Star size={24} fill="#FBBF24" color="#FBBF24" />
                                <Star size={24} fill="#FBBF24" color="#FBBF24" />
                                <Star size={24} fill="#FBBF24" color="#FBBF24" />
                                <Star size={24} />
                            </div>
                        </div>
                    </div>

                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name*</label>
                                <input type="text" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label>Email*</label>
                                <input type="email" placeholder="Your Email" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Add a title</label>
                            <input type="text" placeholder="Title your review" />
                        </div>

                        <div className="form-group">
                            <label>Write your review</label>
                            <textarea placeholder="Write your review here..." style={{ height: '150px' }}></textarea>
                        </div>

                        <div style={{ border: '2px dashed #E2E8F0', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', cursor: 'pointer', marginBottom: '2rem' }}>
                            <Upload size={24} className="text-muted mb-2" />
                            <p className="text-muted m-0">Click here to upload photos</p>
                        </div>

                        <div className="checkbox-group mb-4">
                            <input type="checkbox" id="save-review-info" />
                            <label htmlFor="save-review-info">Save my name, email, and website in this browser for the next time I comment.</label>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary">Submit Review</button>
                            <button className="btn btn-outline">Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ReviewProduct;
