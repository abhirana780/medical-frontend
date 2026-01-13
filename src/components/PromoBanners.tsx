
const PromoBanners = () => {
    return (
        <section className="section">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Banner 1: Upload Prescription */}
                <div style={{
                    background: '#EFF6FF',
                    borderRadius: '1rem',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Fast & Easy</span>
                        <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Upload Prescription</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Upload your doctor's prescription and get medicines delivered.
                        </p>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Upload Now</button>
                    </div>
                    <div style={{ width: '120px' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3022/3022278.png" alt="Prescription" style={{ width: '100%', opacity: 0.9 }} />
                    </div>
                </div>

                {/* Banner 2: Ask a Doctor */}
                <div style={{
                    background: 'var(--primary)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'white'
                }}>
                    <div style={{ flex: 1 }}>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem' }}>24/7 Service</span>
                        <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Ask a Doctor</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Get professional medical advice from our expert doctors.
                        </p>
                        <button className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Chat Now</button>
                    </div>
                    <div style={{ width: '120px' }}>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-2935515-2444983.png" alt="Doctor" style={{ width: '100%' }} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PromoBanners;
