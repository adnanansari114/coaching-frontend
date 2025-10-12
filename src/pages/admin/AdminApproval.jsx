import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';
import API from '../../utils/api';


function getToken() {
  return localStorage.getItem('token');
}

export default function AdminApproval() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/api/admin/users', {
        // headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      setUsers(res.data.users);
      setSuccess('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [success]);

  const handleUpdateRole = async (userId, newRole) => {
    setError('');
    try {
      const res = await API.put(
        `/api/admin/approve/${userId}`,
        { role: newRole }
      );
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user.');
    }
  };

  return (
    <div className="admin-approval-container">
      <h2 className="admin-approval-title">User Management (Admin)</h2>

      {loading && <p className="admin-message">Loading...</p>}
      {error && <div className="admin-message error">{error}</div>}
      {success && <div className="admin-message success">{success}</div>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === 'user' ? (
                  <>
                    <button
                      onClick={() => handleUpdateRole(user._id, 'student')}
                      className="admin-btn"
                    >
                      Approve as Student
                    </button>
                    <button
                      onClick={() => handleUpdateRole(user._id, 'teacher')}
                      className="admin-btn"
                    >
                      Approve as Teacher
                    </button>
                    <button
                      onClick={() => handleUpdateRole(user._id, 'user')}
                      className="admin-btn"
                    >
                      Approve as User
                    </button>
                  </>
                ) : (
                  <span className="admin-status">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
