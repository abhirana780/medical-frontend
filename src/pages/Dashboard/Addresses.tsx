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
            <h2 className="dash-title">Manage Addresses</h2>

            {addresses.length > 0 && (
                <div className="address-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    {addresses.map((addr) => (
                        <div key={addr._id} className="address-card" style={{ padding: '1.5rem', borderRadius: '0.5rem', border: addr.isDefault ? '2px solid var(--primary)' : '1px solid #e2e8f0', position: 'relative' }}>
                            {addr.isDefault && <span className="badge badge-success" style={{ position: 'absolute', top: '10px', right: '10px' }}>Default</span>}
                            <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} /> {addr.city}
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                {addr.street}<br />
                                {addr.city}, {addr.state} {addr.postalCode}<br />
                                {addr.country}
                            </p>
                            <button
                                onClick={() => handleDeleteAddress(addr._id)}
                                style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '0.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Add New Address</h3>
                <form onSubmit={handleSaveAddress}>
                    <div className="form-group mb-4">
                        <button type="button" className="btn btn-outline" onClick={handleUseCurrentLocation} disabled={detectingLoc} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            {detectingLoc ? 'Detecting...' : <><Navigation size={18} /> Use Current Location (Free)</>}
                        </button>
                    </div>

                    <div className="address-grid">
                        <div className="form-group form-full">
                            <label>Street Address*</label>
                            <input type="text" placeholder="House number and street name" value={street} onChange={e => setStreet(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>City*</label>
                            <input type="text" placeholder="Town / City" value={city} onChange={e => setCity(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>State / Parish</label>
                            <input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" placeholder="Zip Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Country*</label>
                            <input type="text" value={country} onChange={e => setCountry(e.target.value)} required />
                        </div>

                        <div className="form-full" style={{ marginTop: '1rem' }}>
                            <div className="checkbox-group">
                                <input type="checkbox" id="default-addr" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} />
                                <label htmlFor="default-addr">Set as default address</label>
                            </div>
                        </div>

                        <div className="form-full" style={{ marginTop: '1.5rem' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
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
