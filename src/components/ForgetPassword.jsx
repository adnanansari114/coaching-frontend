import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user.css';
import API from "../utils/api";

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value.trim());
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending forget password OTP request:', email);
      const res = await API.post('/api/auth/forget-password', {
      });
      // const data = await res.json();
      // console.log('Forget password response:', data);

      if (!res.data) {
        setError(res.data.message || 'Failed to send OTP.');
      } else {
        setSuccess('OTP sent to your email for password reset.');
        setTimeout(() => navigate('/reset-password'), 1500);
      }
    } catch (err) {
      console.error('Forget password error:', err);
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="user-container">
      <h2>Forget Password</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
    </div>
  );
}