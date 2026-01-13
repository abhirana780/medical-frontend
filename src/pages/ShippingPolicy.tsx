import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

const ShippingPolicy = () => {
    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '900px' }}>
                <h1 className="text-center mb-12">Shipping & Delivery Policy</h1>

                <div className="grid-cols-4" style={{ gap: '1.5rem', marginBottom: '4rem' }}>
                    <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                        <Truck size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ margin: '0 0 0.5rem' }}>Free Shipping</h4>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>On orders over $50</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                        <Clock size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ margin: '0 0 0.5rem' }}>Fast Delivery</h4>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>2-3 business days</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                        <ShieldCheck size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ margin: '0 0 0.5rem' }}>Insured</h4>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Coverage included</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                        <MapPin size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ margin: '0 0 0.5rem' }}>Tracking</h4>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Real-time updates</p>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: 'var(--shadow)' }}>
                    <h3 className="mb-4">Order Processing</h3>
                    <p className="mb-6 text-muted">
                        All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
                        If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional
                        days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.
                    </p>

                    <h3 className="mb-4">Shipping Rates & Delivery Estimates</h3>
                    <p className="mb-6 text-muted">
                        Shipping charges for your order will be calculated and displayed at checkout.
                    </p>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                        <thead>
                            <tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>Shipping Method</th>
                                <th style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>Estimated Delivery Time</th>
                                <th style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>Standard Shipping</td>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>3-5 business days</td>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>$5.99 (Free over $50)</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>Expedited Shipping</td>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>2 business days</td>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>$12.95</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>Overnight Shipping</td>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>1-2 business days</td>
                                <td style={{ padding: '1rem', border: '1px solid #E2E8F0' }}>$19.95</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mb-4">Shipment Confirmation & Order Tracking</h3>
                    <p className="mb-6 text-muted">
                        You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).
                        The tracking number will be active within 24 hours.
                    </p>

                    <h3 className="mb-4">Customs, Duties and Taxes</h3>
                    <p className="text-muted">
                        MedPlus is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping
                        are the responsibility of the customer (tariffs, taxes, etc.).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
