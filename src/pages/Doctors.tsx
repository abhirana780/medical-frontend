import { Search, MapPin, Calendar, CheckCircle, ThumbsUp, MessageCircle, Filter } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import './Doctors.css';

const Doctors = () => {
    const { formatPrice } = useCurrency();
    const doctors = [
        {
            name: "Dr. Allison K. Davis",
            specialty: "Cardiologist",
            exp: "12 years",
            minFee: 100,
            maxFee: 400,
            location: "New York, USA",
            rating: "98%",
            img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Dr. Dennis S. Hrey",
            specialty: "Cardiologist",
            exp: "20 years",
            minFee: 300,
            maxFee: 1000,
            location: "Florida, USA",
            rating: "100%",
            img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Dr. Nancy R. Neulton",
            specialty: "Cardiologist",
            exp: "10 years",
            minFee: 150,
            maxFee: 450,
            location: "New York, USA",
            rating: "95%",
            img: "https://images.unsplash.com/photo-1594824476969-519478cae374?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Dr. Peter J. Lio",
            specialty: "Cardiologist",
            exp: "14 years",
            minFee: 120,
            maxFee: 500,
            location: "Texas, USA",
            rating: "92%",
            img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Dr. James K. Valeri",
            specialty: "Cardiologist",
            exp: "13 years",
            minFee: 140,
            maxFee: 600,
            location: "California, USA",
            rating: "94%",
            img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Dr. Lissa T. Williams",
            specialty: "Cardiologist",
            exp: "8 years",
            minFee: 100,
            maxFee: 300,
            location: "Chicago, USA",
            rating: "97%",
            img: "https://images.unsplash.com/photo-1622902911615-87f625372b95?q=80&w=200&auto=format&fit=crop"
        }
    ];

    return (
        <div className="doctors-page">
            {/* Search Strip */}
            <div className="doctor-search-strip">
                <div className="container">
                    <div className="search-inputs">
                        <div className="input-wrap">
                            <MapPin size={18} className="text-muted" />
                            <input type="text" placeholder="Set Location" />
                        </div>
                        <div className="separator"></div>
                        <div className="input-wrap flex-2">
                            <Search size={18} className="text-muted" />
                            <input type="text" placeholder="Search doctors, clinics, etc." />
                        </div>
                        <div className="separator"></div>
                        <div className="input-wrap">
                            <Calendar size={18} className="text-muted" />
                            <input type="text" placeholder="Date" />
                        </div>
                        <button className="btn btn-primary search-go-btn">Search</button>
                    </div>
                </div>
            </div>

            <div className="container layout-grid section">
                {/* Main Content: Doctor List */}
                <div className="main-content">
                    <div className="list-header">
                        <h2>26 Cardiologists available</h2>
                        <div className="sort-filter">
                            <span>Sort by: <strong>Availability</strong></span>
                            <button className="btn btn-outline btn-sm"><Filter size={16} /> Filter</button>
                        </div>
                    </div>

                    <div className="doctors-list">
                        {doctors.map((doc, idx) => (
                            <div key={idx} className="doctor-card">
                                <div className="doc-info-top">
                                    <img src={doc.img} alt={doc.name} className="doc-img" />
                                    <div className="doc-details">
                                        <h3>{doc.name}</h3>
                                        <p className="doc-spec">{doc.specialty}</p>
                                        <div className="doc-meta">
                                            <span><ThumbsUp size={14} color="var(--primary)" /> {doc.rating}</span>
                                            <span><MessageCircle size={14} /> 35 Feedback</span>
                                        </div>
                                        <div className="doc-meta">
                                            <span><MapPin size={14} /> {doc.location}</span>
                                            <span>{formatPrice(doc.minFee)} - {formatPrice(doc.maxFee)}</span>
                                        </div>
                                        <div className="availability-badge">
                                            <Calendar size={12} /> Available Today
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-actions">
                                    <button className="btn btn-primary btn-block">Book Video Consult</button>
                                    <button className="btn btn-outline btn-block">Book Hospital Visit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-widget bg-light">
                        <h4>Free Online Consultation Works?</h4>
                        <ul className="info-list">
                            <li><CheckCircle size={16} /> View listed doctors</li>
                            <li><CheckCircle size={16} /> Book a slot</li>
                            <li><CheckCircle size={16} /> Make payment</li>
                            <li><CheckCircle size={16} /> Be present on the app</li>
                            <li><CheckCircle size={16} /> Receive prescription</li>
                        </ul>
                        <div className="link-row">
                            <a href="#">Privacy Policy</a>
                            <a href="#">T&C</a>
                        </div>
                    </div>

                    <div className="sidebar-widget">
                        <h4>Why Choose Online Consultation?</h4>
                        <ul className="info-list">
                            <li>Consult from the comfort of your home</li>
                            <li>No waiting in long queues</li>
                            <li>100% safe and secure</li>
                            <li>Digital prescription</li>
                        </ul>
                    </div>

                    <div className="sidebar-widget promo-widget bg-blue-light">
                        <div className="promo-content">
                            <small>Need Help?</small>
                            <h3>Upload Prescription</h3>
                            <p>Upload prescription & get call from our health partner.</p>
                            <button className="btn btn-primary btn-sm">Upload Now</button>
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3022/3022278.png" alt="Rx" className="promo-img" />
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="section bg-light">
                <div className="container">
                    <h3 className="mb-8">Frequently Asked Questions</h3>
                    <div className="faq-blocks">
                        <div className="faq-row">
                            <strong>Who is a Cardiologist?</strong>
                            <p>A cardiologist is a doctor who specializes in the study or treatment of heart diseases and heart abnormalities.</p>
                        </div>
                        <div className="faq-row-collapsed">What do Cardiologists do?</div>
                        <div className="faq-row-collapsed">How to consult a Cardiologist online?</div>
                        <div className="faq-row-collapsed">Can I consult with a cardiologist anytime?</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Doctors;
