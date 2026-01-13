import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Phone } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <>
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-text">
                        <span className="subtitle">Welcome to Scott's Medical Supply Grenada!</span>
                        <h1>Unsurpassed Service, <br /> <span className="highlight">Fast Delivery & Great Pricing</span></h1>
                        <p>
                            We pride ourselves at providing unsurpassed customer service, fast delivery and great pricing.
                            That is why we are one of the fastest growing medical supply companies in the Caribbean!
                        </p>
                        <Link to="/catalog" className="btn btn-primary hero-btn">
                            Shop Now
                        </Link>
                    </div>

                    <div className="hero-visual">
                        <div className="circle-bg"></div>
                        <img
                            src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1000&auto=format&fit=crop"
                            alt="Healthcare Collage"
                            className="MainImage"
                        />
                        {/* Decorative small circles simulating the collage effect */}
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop" className="floating-img img-1" alt="" />
                        <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=200&auto=format&fit=crop" className="floating-img img-2" alt="" />
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop" className="floating-img img-3" alt="" />
                    </div>
                </div>
            </section>

            {/* Features Strip directly attached to Hero style */}
            <div className="features-strip container">
                <div className="feature-item">
                    <div className="icon-box"><Truck size={24} /></div>
                    <div className="text-box">
                        <h4>Free Shipping</h4>
                        <p>On orders over $50</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="icon-box"><ShieldCheck size={24} /></div>
                    <div className="text-box">
                        <h4>Secure Payment</h4>
                        <p>100% Secure Transaction</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="icon-box"><Phone size={24} /></div>
                    <div className="text-box">
                        <h4>24/7 Support</h4>
                        <p>Dedicated Support</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
