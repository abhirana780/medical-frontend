import { Bell, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Order Shipped', message: 'Your order #12345 has been shipped via FedEx.', date: '2 hours ago', read: false, type: 'order' },
        { id: 2, title: 'Price Drop Alert', message: 'The item "Digital Blood Pressure Monitor" is now 20% off!', date: '1 day ago', read: false, type: 'promo' },
        { id: 3, title: 'Prescription Approved', message: 'Your prescription for Amoxicillin has been approved by our pharmacist.', date: '2 days ago', read: true, type: 'medical' },
        { id: 4, title: 'Welcome!', message: 'Thanks for creating an account with Scott\'s Medical Supply.', date: '3 days ago', read: true, type: 'system' }
    ]);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="dash-title" style={{ margin: 0 }}>Notifications</h2>
                <button
                    className="btn btn-outline btn-sm"
                    onClick={markAllRead}
                    disabled={notifications.every(n => n.read)}
                >
                    Mark All Read
                </button>
            </div>

            {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <Bell size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p>No notifications yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            style={{
                                padding: '1rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.5rem',
                                background: notification.read ? '#fff' : '#F8FAFC',
                                borderLeft: notification.read ? '1px solid #e2e8f0' : '4px solid var(--primary)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'start'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{notification.title}</h4>
                                    {!notification.read && (
                                        <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>New</span>
                                    )}
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {notification.message}
                                </p>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>
                                    {notification.date}
                                </small>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {!notification.read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        title="Mark as read"
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                                    >
                                        <Check size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    title="Delete"
                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
