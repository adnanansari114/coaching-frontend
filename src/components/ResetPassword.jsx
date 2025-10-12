import React, { useState } from 'react';
import '../styles/user.css';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: '',
    otp: '',
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
      console.log('Sending reset password request:', form);
      const res = await API.post('http://localhost:5000/api/auth/reset-password', {
          email: form.email.toLowerCase(),
          otp: form.otp,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword
      });
      
      if (!res.data) {
        setError(res.data.message || 'Failed to reset password.');
      } else {
        setSuccess('Password reset successfully!');
        setForm({ email: '', otp: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="user-container">
      <h2>Reset Password</h2>
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
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
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
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
    </div>
  );
}