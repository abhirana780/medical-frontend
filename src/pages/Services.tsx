import { Zap, Mail, FileText, Activity, Truck, ChevronRight, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const servicesData = [
    {
        title: "Upload Prescription",
        description: "Easily upload your doctor's prescription to order medicines directly from your device.",
        icon: FileText,
        colorClass: "blue",
        link: "/upload-prescription",
        btnText: "Upload Now"
    },
    {
        title: "Patient Inquiry",
        description: "Have specific questions? Fill out our detailed inquiry form and our medical staff will assist you.",
        icon: Mail,
        colorClass: "green",
        link: "/contact",
        btnText: "Inquire Now"
    },
    {
        title: "Track Order",
        description: "Stay updated on your delivery status. Track your medical supplies in real-time.",
        icon: Truck,
        colorClass: "orange",
        link: "/account/orders",
        btnText: "Track Now"
    },
    {
        title: "Medical History",
        description: "Securely access your past prescriptions and order history whenever you need them.",
        icon: Activity,
        colorClass: "red",
        link: "/account/medical-history",
        btnText: "View History"
    },
    {
        title: "Product Reviews",
        description: "Share your experience with our products to help the community make informed choices.",
        icon: Zap,
        colorClass: "purple",
        link: "/account/orders",
        btnText: "Manage Reviews"
    },
    {
        title: "Professional Services",
        description: "Dedicated support and bulk supply solutions for healthcare professionals and clinics.",
        icon: Stethoscope,
        colorClass: "teal",
        link: "/contact?type=professional",
        btnText: "Learn More"
    }
];

const Services = () => {
    return (
        <div className="services-page">
            <div className="services-hero">
                <div className="container">
                    <h1>Our Services</h1>
                    <p>Comprehensive healthcare solutions designed for your comfort and convenience.</p>
                </div>
            </div>

            <div className="container">
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <Link to={service.link} className="service-card" key={index}>
                            <div className={`service-icon-wrapper ${service.colorClass}`}>
                                <service.icon size={36} strokeWidth={1.5} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <span className="service-link">
                                {service.btnText} <ChevronRight size={16} />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
