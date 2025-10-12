import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user.css';
import API from "../utils/api";

export default function ChangePassword() {
  const [form, setForm] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirm password do not match.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending change password request:', form);
      const res = await API.post('/api/auth/change-password', {
          email: form.email.toLowerCase(),
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword
      });
      console.log('Change password response:', res.data);

      if (!res.data) {
        setError(data.message || 'Failed to change password.');
      } else {
        setSuccess('Password changed successfully!');
        setForm({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      console.error('Change password error:', err);
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="user-container">
      <h2>Change Password</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
    </div>
  );
}