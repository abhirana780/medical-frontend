import { InfiniteSlider } from './ui/InfiniteSlider';

const Brands = () => {
    const brands = [
        { name: "Merck", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Merck_Logo_2024.svg/2560px-Merck_Logo_2024.svg.png" },
        { name: "CeraVe", img: "https://logos-world.net/wp-content/uploads/2022/02/CeraVe-Logo.png" },
        { name: "Revlon", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Revlon_logo.svg/2560px-Revlon_logo.svg.png" },
        { name: "Pfizer", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pfizer_%282021%29.svg/2560px-Pfizer_%282021%29.svg.png" },
        { name: "Loreal", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/L%27Or%C3%A9al_logo.svg/2560px-L%27Or%C3%A9al_logo.svg.png" },
        { name: "Johnson & Johnson", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Johnson_%26_Johnson_logo.svg/2560px-Johnson_%26_Johnson_logo.svg.png" },
        { name: "Roche", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/2560px-Hoffmann-La_Roche_logo.svg.png" },
        { name: "Novartis", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Novartis_logo.svg/2560px-Novartis_logo.svg.png" }
    ];

    return (
        <section className="section" style={{ padding: '5rem 0', background: 'white', borderTop: '1px solid #F1F5F9' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#94A3B8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em'
                    }}>
                        Trusted by World-Class Brands
                    </h3>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* First Row - Normal Speed */}
                    <div style={{ marginBottom: '1rem' }}>
                        <InfiniteSlider speed={35}>
                            {brands.map((b, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '0 3rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img
                                        src={b.img}
                                        alt={b.name}
                                        style={{
                                            height: '35px',
                                            maxWidth: '150px',
                                            objectFit: 'contain',
                                            filter: 'grayscale(100%)',
                                            opacity: 0.4,
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.filter = 'grayscale(0%)';
                                            e.currentTarget.style.opacity = '1';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.filter = 'grayscale(100%)';
                                            e.currentTarget.style.opacity = '0.4';
                                        }}
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>

                    {/* Second Row - Reversed or Different Speed */}
                    <div>
                        <InfiniteSlider speed={45}>
                            {[...brands].reverse().map((b, i) => (
                                <div
                                    key={`rev-${i}`}
                                    style={{
                                        padding: '0 3rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img
                                        src={b.img}
                                        alt={b.name}
                                        style={{
                                            height: '35px',
                                            maxWidth: '150px',
                                            objectFit: 'contain',
                                            filter: 'grayscale(100%)',
                                            opacity: 0.4,
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.filter = 'grayscale(0%)';
                                            e.currentTarget.style.opacity = '1';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.filter = 'grayscale(100%)';
                                            e.currentTarget.style.opacity = '0.4';
                                        }}
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;
