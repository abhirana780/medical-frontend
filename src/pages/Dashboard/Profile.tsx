import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, X } from 'lucide-react';
import api from '../../utils/api';

const Profile = () => {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        height: '',
        weight: '',
        newPassword: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/api/auth/profile');
                setFormData(prev => ({
                    ...prev,
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phoneNumber: data.phoneNumber || '',
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                    gender: data.gender || '',
                    height: data.height || '',
                    weight: data.weight || ''
                }));
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const payload: any = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                height: formData.height,
                weight: formData.weight
            };

            if (formData.newPassword) {
                payload.password = formData.newPassword;
            }

            const { data } = await api.put('/api/auth/profile', payload);

            // Updates local context
            login(data);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error: any) {
            console.error("Failed to update profile", error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="dash-title" style={{ margin: 0 }}>My Info</h2>
                {!isEditing ? (
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="btn btn-outline btn-sm"
                            onClick={() => setIsEditing(false)}
                            disabled={isLoading}
                        >
                            <X size={16} /> Cancel
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            <Save size={16} /> {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </div>

            <div className="section-header-simple" style={{ padding: '0 0 1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0 }}>Personal Details</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Row 1: Names */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>First Name</small>
                        {isEditing ? (
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="font-medium">{formData.firstName}</div>
                        )}
                    </div>
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Last Name</small>
                        {isEditing ? (
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="font-medium">{formData.lastName}</div>
                        )}
                    </div>
                </div>

                {/* Row 2: Contact */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Email Address</small>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="font-medium">{formData.email}</div>
                        )}
                    </div>
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Phone Number</small>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="(555) 123-4567"
                            />
                        ) : (
                            <div className="font-medium">{formData.phoneNumber || '-'}</div>
                        )}
                    </div>
                </div>

                {/* Row 3: Demographics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Date of Birth</small>
                        {isEditing ? (
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="form-control"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="font-medium">{formData.dateOfBirth || '-'}</div>
                        )}
                    </div>
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Gender</small>
                        {isEditing ? (
                            <select
                                name="gender"
                                className="form-control"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        ) : (
                            <div className="font-medium">{formData.gender || '-'}</div>
                        )}
                    </div>
                </div>

                {/* Row 4: Body Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Height</small>
                        {isEditing ? (
                            <input
                                type="text"
                                name="height"
                                className="form-control"
                                value={formData.height}
                                onChange={handleChange}
                                placeholder="e.g. 5'10"
                            />
                        ) : (
                            <div className="font-medium">{formData.height || '-'}</div>
                        )}
                    </div>
                    <div className="info-row">
                        <small style={{ color: 'var(--text-muted)' }}>Weight</small>
                        {isEditing ? (
                            <input
                                type="text"
                                name="weight"
                                className="form-control"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="e.g. 170 lbs"
                            />
                        ) : (
                            <div className="font-medium">{formData.weight || '-'}</div>
                        )}
                    </div>
                </div>

                {/* Password Change Field - Only visible in edit mode */}
                {isEditing && (
                    <div className="info-row border-t pt-4">
                        <small style={{ color: 'var(--text-muted)' }}>New Password</small>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Leave blank to keep current"
                            className="form-control"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
