import React, { useState } from "react";
import "../styles/TeacherPages.css";
import API from "../../utils/api";

export default function AddTopper() {
  const [form, setForm] = useState({ name: "", percentage: "", photo: null });

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("percentage", form.percentage);
    if (form.photo) fd.append("photo", form.photo);

    try {
      await API.post("/api/toppers", fd);
      alert("Topper Added Successfully ✅");
      setForm({ name: "", percentage: "", photo: null });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="add-course-container">
      <h2 className="add-course-title">🏆 Add Topper</h2>
      <form
        className="add-course-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter student name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="percentage">Percentage</label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            placeholder="Enter percentage"
            value={form.percentage}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            className="form-input"
          />
        </div>

        <button type="submit" className="btn">
          Add Topper
        </button>
      </form>
    </div>
  );
}
