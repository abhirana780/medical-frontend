import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-col">
                    <h3>Scott's Medical Supply</h3>
                    <p>Your trusted partner for medical supplies and equipment.</p>
                </div>
                <div className="footer-col">
                    <h4>Shop</h4>
                    <ul>
                        <li><Link to="/catalog?cat=mobility">Mobility</Link></li>
                        <li><Link to="/catalog?cat=respiratory">Respiratory</Link></li>
                        <li><Link to="/catalog?cat=diabetic">Diabetes Care</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/inquiry">Patient Inquiry</Link></li>
                        <li><Link to="/account/orders">Track Order</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                        <li><Link to="/returns">Returns Policy</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Contact</h4>
                    <p>Scott's Medical Supply</p>
                    <p>Phone: 473-440-7030</p>
                    <p>Email: contact@scottsmedical.com</p>
                    <p>Grenada</p>
                </div>
            </div>
            <div className="footer-bottom" style={{ flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
                <p>&copy; {new Date().getFullYear()} Scott's Medical Supply. All Rights Reserved.</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    Powered by Wipronix Technologies
                </p>

            </div>
        </footer>
    );
};

export default Footer;
