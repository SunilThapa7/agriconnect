import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../helper/common';
import './Profile.css';

const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Profile = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        gender: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Load user data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const user = JSON.parse(storedUserData);
            setFormData({
                id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender || '',
                role: user.role || ''
            });
        }
        setLoading(false);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');
        try {
            const response = await axios.patch(`${baseUrl}/authUser/updateUser`, {
                id: formData.id,
                name: formData.name,
                gender: formData.gender,
                email: formData.email,
                role: formData.role
            });
            if (response.data && response.data.affectedRows > 0) {
                setMessage('Profile updated successfully!');
                // Update localStorage
                localStorage.setItem('userData', JSON.stringify({ ...formData }));
            } else {
                setError('Failed to update profile.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="profile-card-container">
            {loading ? (
                <div className="profile-loading">Loading profile...</div>
            ) : (
                <div className="profile-card">
                    <div className="profile-avatar">
                        {getInitials(formData.name)}
                    </div>
                    <h2 className="profile-name">{formData.name}</h2>
                    <p className="profile-role">{formData.role}</p>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                readOnly
                                disabled
                            />
                        </div>
                        <button type="submit" className="profile-save-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        {message && <div className="success-message">{message}</div>}
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile; 