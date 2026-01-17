import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePDF } from '@react-pdf/renderer';
import InvoicePDF from '../../components/InvoicePDF';
import { MapPin, CreditCard, Undo2, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import api from '../../utils/api';

const OrderDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { formatPrice } = useCurrency();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/api/orders/${id}`);
                setOrder(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch order details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    if (loading) return <div>Loading details...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!order) return <div>Order not found</div>;

    const { shippingAddress, orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, isDelivered } = order;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/account/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Undo2 size={16} /> Back
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {!isDelivered && (
                        <Link to="/account/cancellation" className="btn btn-outline text-red" style={{ borderColor: '#fee2e2', color: '#dc2626' }}>Request Cancellation</Link>
                    )}
                    <Link to="/track-order" className="btn btn-primary">Track Order</Link>

                    <InvoiceDownloadButton order={order} />
                </div>
            </div>

            <h2 className="dash-title">Order Details #{order._id.substring(0, 8)}...</h2>

            <div className="timeline">
                <div className="timeline-step completed">
                    <div className="step-dot">✓</div>
                    <span>Order Placed</span>
                </div>
                <div className={`timeline-step ${isDelivered ? 'completed' : 'active'}`}>
                    <div className="step-dot">{isDelivered ? '✓' : '2'}</div>
                    <span>Processing</span>
                </div>
                <div className={`timeline-step ${isDelivered ? 'completed' : ''}`}>
                    <div className="step-dot">{isDelivered ? '✓' : '3'}</div>
                    <span>Shipped</span>
                </div>
                <div className={`timeline-step ${isDelivered ? 'active' : ''}`}>
                    <div className="step-dot">{isDelivered ? '✓' : '4'}</div>
                    <span>Delivered</span>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                {orderItems.map((item: any, index: number) => (
                    <div key={index} className="order-card-row" style={{ marginBottom: '1rem' }}>
                        <div className="order-info-left" style={{ flex: 1 }}>
                            <img src={item.image} alt={item.name} className="order-thumb" />
                            <div>
                                <h4>{item.name}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Qty: {item.qty}</p>
                                <p style={{ fontWeight: '600' }}>{formatPrice(item.price)}</p>
                            </div>
                        </div>
                        <Link
                            to={`/product/${item.product}?review=true`}
                            className="btn btn-primary btn-sm"
                            style={{ height: 'fit-content' }}
                        >
                            Write a Review
                        </Link>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem' }}>
                    <h4 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <MapPin size={18} /> Shipping Address
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
                        {user?.name}<br />
                        {shippingAddress.address}, {shippingAddress.apartment && `${shippingAddress.apartment}, `}<br />
                        {shippingAddress.city}, {shippingAddress.postalCode}<br />
                        {shippingAddress.country}
                    </p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem' }}>
                    <h4 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <CreditCard size={18} /> Payment Summary
                    </h4>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Subtotal</span><span>{formatPrice(itemsPrice || 0)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Shipping</span><span>{formatPrice(shippingPrice || 0)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                            <span>Total</span><span>{formatPrice(totalPrice || 0)}</span>
                        </div>
                        <div style={{ marginTop: '0.5rem', color: '#166534', fontSize: '0.8rem' }}>
                            Payment Method: {paymentMethod === 'credit-card' ? 'Credit Card' : paymentMethod?.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InvoiceDownloadButton = ({ order }: { order: any }) => {
    const [instance] = usePDF({ document: <InvoicePDF order={order} /> });

    if (instance.loading) return (
        <button className="btn btn-outline" disabled style={{ display: 'flex', gap: '0.5rem', cursor: 'wait' }}>
            Preparing...
        </button>
    );

    if (instance.error) return (
        <button className="btn btn-outline" disabled style={{ color: 'red' }}>
            Error
        </button>
    );

    return (
        <a
            href={instance.url!}
            download={`invoice_${order._id}.pdf`}
            className="btn btn-outline"
            style={{ display: 'flex', gap: '0.5rem', textDecoration: 'none', alignItems: 'center', cursor: 'pointer' }}
        >
            <Download size={16} /> Invoice
        </a>
    );
};

export default OrderDetails;
