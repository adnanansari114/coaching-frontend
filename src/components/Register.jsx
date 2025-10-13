import { useState } from 'react';
import '../styles/user.css';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await API.post('/api/auth/send-otp', { 
          email: form.email 
      });
      // const data = await res.json();
      if (res.data && res.data.message) {
        setSuccess(res.data.message);
        setOtpSent(true);
      } else {
        setError('Failed to send OTP.');
      }
    } catch (err) {
      setError('Server error.');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await API.post('/api/auth/verify-otp', {
          email: form.email, otp: form.otp 
      });
      if (!res.data) {
        setError(res.data.message || 'Invalid OTP.');
      } else {
        setSuccess('OTP verified successfully.');
        setOtpVerified(true);
      }
    } catch (err) {
      setError('Server error.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (!otpVerified) {
      setError('Please verify OTP before registering.');
      setLoading(false);
      return;
    }

    try {
      const res = await API.post('/api/auth/register', {
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role
      });
      if (!res.data.ok) {
        setError(res.data.message || 'Registration failed.');
      } else {
        setSuccess('Registration successful! Please wait for admin approval.');
        setForm({ name: '', username: '', email: '', password: '', confirmPassword: '', role: '', otp: '' });
        setOtpSent(false);
        setOtpVerified(false);
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="user-container">
      <h2>Register</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={otpSent && !otpVerified}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          disabled={otpSent && !otpVerified}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={otpSent && !otpVerified}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={otpSent && !otpVerified}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          disabled={otpSent && !otpVerified}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          disabled={otpSent && !otpVerified}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {!otpSent && (
          <button type="button" onClick={handleSendOTP} disabled={loading || !form.email}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        )}

        {otpSent && !otpVerified && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleVerifyOTP} disabled={loading || !form.otp}>
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
          </>
        )}

        {otpVerified && (
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        )}

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
    </div>
  );
}

