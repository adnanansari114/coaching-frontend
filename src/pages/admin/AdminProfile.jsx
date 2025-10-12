import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";
import API from "../../utils/api";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/admin/profile");
        setAdmin(res.data.admin);
        setLoading(false);
      } catch (err) {
        setMessage("Failed to load profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await API.put(
        "/api/admin/profile",
        { name: admin.name, email: admin.email }
      );
      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setMessage("Failed to update profile");
    }
  };

  if (loading) return <p className="admin-message">Loading...</p>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Profile</h1>

      {message && (
        <p
          className={`admin-message ${
            message.includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}

      <div className="admin-field">
        <label>Name:</label>
        {editing ? (
          <input
            type="text"
            value={admin.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
            className="admin-input"
          />
        ) : (
          <p className="admin-text">{admin.name}</p>
        )}
      </div>

      <div className="admin-field">
        <label>Email:</label>
        {editing ? (
          <input
            type="email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            className="admin-input"
          />
        ) : (
          <p className="admin-text">{admin.email}</p>
        )}
      </div>

      <div className="admin-actions">
        {editing ? (
          <>
            <button onClick={handleUpdate} className="admin-btn save">
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="admin-btn cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="admin-btn edit">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
