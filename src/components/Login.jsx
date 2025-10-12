import React, { useState } from 'react';
import '../styles/user.css';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api.jsx';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  // const LOGIN_URL = `${API}/auth/login`; 

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

    try {
      const res = await API.post('/api/auth/login', {
        email: form.email.toLowerCase(),
        password: form.password
      });

      if (!res.data) {
        setError(res.data.message || 'Login failed.');
        setLoading(false);
        return;
      }

      if (!res.data.token || !res.data.user) {
        setError('Invalid response from server.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setSuccess('Login successful!');

      setTimeout(() => {
        if (res.data.user.role === 'admin') {
          navigate('/admin-profile');
        } else if (res.data.user.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else if (res.data.user.role === 'user') {
          navigate('/user-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }, 1500);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed.');
      setLoading(false);
    }

  };

  return (
    <div className="user-container">
      <h2>Login</h2>
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
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/forget-password" style={{ color: '#007bff', textDecoration: 'none' }}>
            Forgot Password?
          </Link>
        </div>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
    </div>
  );
}