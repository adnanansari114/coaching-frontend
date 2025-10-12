import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";
import API from "../../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/api/admin/stats");
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stats");
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Students</h2>
          <p>{stats.students}</p>
        </div>
        <div className="dashboard-card">
          <h2>Teachers</h2>
          <p>{stats.teachers}</p>
        </div>
        <div className="dashboard-card">
          <h2>Courses</h2>
          <p>{stats.courses}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
