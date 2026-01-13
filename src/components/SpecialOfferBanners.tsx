
const SpecialOfferBanners = () => {
    return (
        <section className="section">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>

                {/* Large Banner - Pamper Yourself */}
                <div style={{
                    background: '#EAE6DD',
                    borderRadius: '1rem',
                    padding: '3rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '400px',
                    position: 'relative'
                }}>
                    <h2 style={{ fontSize: '3rem', margin: '0 0 1rem', lineHeight: 1 }}>PAMPER <br /> YOURSELF</h2>
                    <p style={{ marginBottom: '2rem', maxWidth: '300px' }}>Get the best care for you and your skin with our new organic line.</p>
                    <button className="btn" style={{ background: 'black', color: 'white', alignSelf: 'flex-start' }}>Shop Now</button>

                    <img src="https://images.unsplash.com/photo-1556228552-523cd1308dff?q=80&w=1000&auto=format&fit=crop"
                        alt="Spa"
                        style={{ position: 'absolute', right: 0, bottom: 0, height: '100%', borderRadius: '0 1rem 1rem 0', maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))' }}
                    />
                </div>

                {/* Stacked Banners */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Top Right - Baby Care */}
                    <div style={{ background: '#E0F2FE', borderRadius: '1rem', padding: '2rem', display: 'flex', alignItems: 'center', flex: 1 }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>All About Baby</h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>Gentle care for your little one.</p>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Discover</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=200&auto=format&fit=crop" style={{ borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover' }} alt="Baby" />
                    </div>

                    {/* Bottom Right - Discount */}
                    <div style={{ background: '#0EA5E9', borderRadius: '1rem', padding: '2rem', color: 'white', flex: 1, display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>30% <span style={{ fontSize: '1rem', fontWeight: 400 }}>SAVINGS</span></h3>
                            <p style={{ opacity: 0.9, marginBottom: '1rem' }}>On all diabetic supplies this weekend.</p>
                            <button className="btn" style={{ background: 'white', color: '#0EA5E9', padding: '0.5rem 1rem' }}>Shop Sale</button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default SpecialOfferBanners;
