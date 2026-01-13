import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';

const FAQItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid var(--border)', padding: '1.5rem 0' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem' }}
            >
                {q}
                {isOpen ? <ChevronDown style={{ transform: 'rotate(180deg)' }} /> : <Plus />}
            </div>
            {isOpen && (
                <p className="text-muted mt-4 animate-fade-in" style={{ lineHeight: 1.6 }}>{a}</p>
            )}
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            q: "How do I place an order?",
            a: "You can place an order directly on our website. Simply browse our catalog, add items to your cart, and proceed to checkout. You can also upload a prescription for relevant medicines."
        },
        {
            q: "Do you offer international shipping?",
            a: "Currently, we only ship within Grenada. We are working on expanding our shipping capabilities to neighboring islands soon."
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept all major credit cards (Visa, Mastercard, Amex) as well as cash on delivery for select locations."
        },
        {
            q: "How can I track my order?",
            a: "Once your order is shipped, you will receive a tracking link via email. You can also track your order status in your account dashboard under 'My Orders'."
        },
        {
            q: "Can I cancel my order?",
            a: "Yes, you can cancel your order within 24 hours of placing it, provided it hasn't been shipped yet. Go to 'My Orders' -> 'Cancel Order'."
        },
        {
            q: "Do you accept insurance?",
            a: "We facilitate insurance claims by providing all necessary invoices and medical codes, but payment must be made upfront. We are working on direct insurance billing."
        }
    ];

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-12">
                    <h1 className="mb-4">Frequently Asked Questions</h1>
                    <p className="text-muted">Find answers to common questions about our products and services</p>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow)' }}>
                    {faqs.map((f, i) => (
                        <FAQItem key={i} q={f.q} a={f.a} />
                    ))}
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center', background: '#F0F9FF', padding: '3rem', borderRadius: '1rem' }}>
                    <h3 className="mb-4">Still have questions?</h3>
                    <p className="text-muted mb-6">Can't find the answer you're looking for? Please seek further assistance from our friendly team.</p>
                    <a href="/contact" className="btn btn-primary">Contact Us</a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
