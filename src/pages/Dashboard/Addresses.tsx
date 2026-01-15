import { useState, useEffect } from 'react';
import { MapPin, Trash2, Navigation } from 'lucide-react';
import api from '../../utils/api';

const Addresses = () => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('Grenada');
    const [isDefault, setIsDefault] = useState(false);
    const [detectingLoc, setDetectingLoc] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await api.get('/api/auth/profile');
            if (res.data.addresses) {
                setAddresses(res.data.addresses);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setDetectingLoc(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Using Nominatim OpenStreetMap API (Free)
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await res.json();

                if (data && data.address) {
                    setStreet(data.address.road || data.address.pedestrian || '');
                    setCity(data.address.city || data.address.town || data.address.village || '');
                    setState(data.address.state || '');
                    setPostalCode(data.address.postcode || '');
                    setCountry(data.address.country || 'Grenada');
                } else {
                    alert('Could not determine address from location.');
                }
            } catch (error) {
                console.error("Geocoding error:", error);
                alert("Error fetching address details.");
            } finally {
                setDetectingLoc(false);
            }
        }, (error) => {
            setDetectingLoc(false);
            if (error.code === 1) {
                alert("Permission denied. Please allow location access.");
            } else {
                alert("Position unavailable.");
            }
        });
    };

    const handleSaveAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/api/users/addresses', {
                street, city, state, postalCode, country, isDefault
            });
            setAddresses(res.data);
            setStreet('');
            setCity('');
            setState('');
            setPostalCode('');
            setIsDefault(false);
            alert('Address Saved!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error saving address');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            const res = await api.delete(`/api/users/addresses/${id}`);
            setAddresses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="dash-title" style={{ fontSize: '1.8rem', background: 'linear-gradient(to right, #1e293b, #334155)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                    Manage Addresses
                </h2>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    {addresses.length} Saved Address{addresses.length !== 1 ? 'es' : ''}
                </div>
            </div>

            {addresses.length > 0 && (
                <div className="address-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {addresses.map((addr) => (
                        <div key={addr._id} className="address-card" style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: addr.isDefault ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                            position: 'relative',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                            transition: 'all 0.2s ease-in-out'
                        }}>
                            {addr.isDefault && (
                                <span style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: '#eff6ff',
                                    color: '#2563eb',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem'
                                }}>Default</span>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: '#f1f5f9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#475569'
                                }}>
                                    <MapPin size={18} />
                                </div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>{addr.city}</h4>
                            </div>

                            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                <span style={{ display: 'block', color: '#334155', fontWeight: 500 }}>{addr.street}</span>
                                {addr.city}, {addr.state} {addr.postalCode}<br />
                                {addr.country}
                            </p>

                            <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                <button
                                    onClick={() => handleDeleteAddress(addr._id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        padding: '0.5rem 0',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#ef4444'}
                                >
                                    <Trash2 size={16} /> Remove Address
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                border: '1px solid #f1f5f9'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Add New Address</h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Enter your delivery details below</p>
                </div>

                <form onSubmit={handleSaveAddress}>
                    <div className="form-group mb-6" style={{ marginBottom: '2rem' }}>
                        <button
                            type="button"
                            onClick={handleUseCurrentLocation}
                            disabled={detectingLoc}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.875rem',
                                background: 'white',
                                border: '1px solid #cbd5e1',
                                borderRadius: '0.75rem',
                                color: '#2563eb',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.background = '#f8fafc'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = 'white'; }}
                        >
                            {detectingLoc ? (
                                <>Detecting Location...</>
                            ) : (
                                <><Navigation size={18} /> Use Current Location</>
                            )}
                        </button>
                    </div>

                    <div className="address-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="form-group form-full" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Street Address*</label>
                            <input
                                type="text"
                                placeholder="House number and street name"
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                                required
                                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>City*</label>
                            <input
                                type="text"
                                placeholder="Town / City"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>State</label>
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Postal Code</label>
                            <input
                                type="text"
                                placeholder="Zip Code"
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)}
                                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Country*</label>
                            <input
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                required
                                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                            />
                        </div>

                        <div className="form-full" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <label className="checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    id="default-addr"
                                    checked={isDefault}
                                    onChange={e => setIsDefault(e.target.checked)}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563eb' }}
                                />
                                <span style={{ fontSize: '0.95rem', color: '#475569' }}>Set as default address</span>
                            </label>
                        </div>

                        <div className="form-full" style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                                }}
                            >
                                {loading ? 'Saving...' : 'Save Address'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addresses;
