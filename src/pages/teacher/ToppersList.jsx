import React, { useEffect, useState } from "react";
import "../styles/TeacherPages.css"; // CSS import
import API from "../../utils/api";

export default function ToppersList() {
  const [toppers, setToppers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", percentage: "", photo: null });
  const token = localStorage.getItem("token");

  const fetchToppers = async () => {
    const res = await API.get("/api/toppers/getToppers");
    setToppers(res.data);
  };

  useEffect(() => {
    fetchToppers();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (topper) => {
    setForm({ name: topper.name, percentage: topper.percentage, photo: null });
    setEditingId(topper._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("percentage", form.percentage);
    if (form.photo) fd.append("photo", form.photo);

    await API.put(`/api/toppers/${editingId}`, {
      body: fd,
    });
    setEditingId(null);
    setForm({ name: "", percentage: "", photo: null });
    fetchToppers();
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/toppers/${id}`);
    fetchToppers();
  };

  return (
    <div className="topper-container">
      <h2 className="page-title">Manage Toppers</h2>

      {editingId && (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-form">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="percentage"
            value={form.percentage}
            placeholder="Percentage"
            onChange={handleChange}
            required
          />
          <input type="file" name="photo" onChange={handleChange} accept="image/*" />
          <button type="submit">Update</button>
        </form>
      )}

      <div className="topper-grid">
        {toppers.map((t) => (
          <div key={t._id} className="topper-card">
            <img src={`http://localhost:5000${t.photo}`} alt={t.name} className="topper-img" />
            <h3 className="topper-name">{t.name}</h3>
            <p className="topper-percentage">{t.percentage}%</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(t)} className="btn">Edit</button>
              <button onClick={() => handleDelete(t._id)} className="btn delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div> 
  );
}
