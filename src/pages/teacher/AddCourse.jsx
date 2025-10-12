import { useState } from "react";
import API from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/TeacherPages.css";
import { FaArrowRightToBracket } from "react-icons/fa6";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    duration: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const teacherId = user?.id;
    if (!teacherId) return alert("Teacher ID missing!");

    try {
      setLoading(true);
      await API.post(
        "/api/courses/create",
        {
          title: form.title,
          description: form.description,
        }
      );
      alert("Course created successfully!");
      navigate("/teacher-dashboard");
    } catch (err) {
      console.error("Error creating course", err);
      alert("Course creation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-course-container">
      <h1 className="add-course-title">📚 Add New Course</h1>
        <Link to="/teacher-course"> Teacher Courses <FaArrowRightToBracket /></Link>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter course title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter course description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading} className="btn">
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
