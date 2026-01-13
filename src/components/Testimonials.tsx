
const Testimonials = () => {
    const reviews = [
        { name: "John Doe", role: "Diabetes Patient", text: "The glucose monitor I bought is a lifesaver. Accurate and easy to use.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Sarah Smith", role: "Caregiver", text: "Excellent service and fast shipping. The wheelchair arrived in perfect condition.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Dr. James Wilson", role: "Physician", text: "I recommend Scott's Medical Supply to all my patients for their reliable equipment.", img: "https://randomuser.me/api/portraits/men/85.jpg" }
    ];

    return (
        <section className="section" style={{ background: '#F8FAFC' }}>
            <div className="container">
                <h2 className="text-center mb-12">What Our Customers Say</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {reviews.map((review, idx) => (
                        <div key={idx} style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <img src={review.img} alt={review.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem' }} />
                                <div>
                                    <h4 style={{ margin: 0 }}>{review.name}</h4>
                                    <small className="text-muted">{review.role}</small>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
