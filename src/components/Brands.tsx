
const Brands = () => {
    const brands = [
        { name: "Merck", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Merck_Logo_2024.svg/2560px-Merck_Logo_2024.svg.png" },
        { name: "CeraVe", img: "https://logos-world.net/wp-content/uploads/2022/02/CeraVe-Logo.png" },
        { name: "Revlon", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Revlon_logo.svg/2560px-Revlon_logo.svg.png" },
        { name: "Pfizer", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pfizer_%282021%29.svg/2560px-Pfizer_%282021%29.svg.png" },
        { name: "Loreal", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/L%27Or%C3%A9al_logo.svg/2560px-L%27Or%C3%A9al_logo.svg.png" }
    ];

    return (
        <section className="section" style={{ padding: '3rem 0', borderTop: '1px solid #eee' }}>
            <div className="container">
                <h3 className="text-center mb-8" style={{ fontSize: '1.5rem', opacity: 0.7 }}>Popular Brands</h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    opacity: 0.6,
                    filter: 'grayscale(100%)'
                }}>
                    {brands.map((b, i) => (
                        <img key={i} src={b.img} alt={b.name} style={{ height: '40px', objectFit: 'contain' }} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Brands;
