import { useState } from 'react';
import { Save, Bell, Lock, Globe } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        twoFactorAuth: false,
        darkMode: false,
        language: 'en'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        // Here you would typically save to backend
        alert("Settings saved successfully!");
    };

    return (
        <div>
            <h2 className="dash-title">Account Settings</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Notifications Section */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                        <Bell size={20} className="text-primary" />
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Notifications</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>Order Updates</div>
                                <small style={{ color: 'var(--text-muted)' }}>Receive emails about your order status.</small>
                            </div>
                            <label className="switch">
                                <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>SMS Notifications</div>
                                <small style={{ color: 'var(--text-muted)' }}>Receive text messages for delivery updates.</small>
                            </div>
                            <label className="switch">
                                <input type="checkbox" name="smsNotifications" checked={settings.smsNotifications} onChange={handleChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>Marketing Emails</div>
                                <small style={{ color: 'var(--text-muted)' }}>Receive offers and newsletters.</small>
                            </div>
                            <label className="switch">
                                <input type="checkbox" name="marketingEmails" checked={settings.marketingEmails} onChange={handleChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                        <Lock size={20} className="text-primary" />
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Security</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>Two-Factor Authentication</div>
                                <small style={{ color: 'var(--text-muted)' }}>Add an extra layer of security to your account.</small>
                            </div>
                            <label className="switch">
                                <input type="checkbox" name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                        <Globe size={20} className="text-primary" />
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Preferences</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', alignItems: 'center', gap: '1rem' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>Language</div>
                                <small style={{ color: 'var(--text-muted)' }}>Select your preferred language.</small>
                            </div>
                            <select
                                name="language"
                                value={settings.language}
                                onChange={handleChange}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="en">English (US)</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ fontWeight: '500' }}>Dark Mode</div>
                            </div>
                            <label className="switch">
                                <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Changes
                    </button>
                </div>
            </div>

            <style>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 48px;
                    height: 24px;
                }
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #cbd5e1;
                    transition: .4s;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                }
                input:checked + .slider {
                    background-color: var(--primary);
                }
                input:checked + .slider:before {
                    transform: translateX(24px);
                }
                .slider.round {
                    border-radius: 24px;
                }
                .slider.round:before {
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
};

export default Settings;
