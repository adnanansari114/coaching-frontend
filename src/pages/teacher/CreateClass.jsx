import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../styles/TeacherPages.css";

const CreateClass = () => {
  const [courseId, setCourseId] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/api/courses/teacher/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!courseId || !className || !date) {
      return alert("Please select a course, enter a title, and select a date.");
    }
    try {
      await API.post(
        "/api/classes/create",
        { courseId, title: className, date: new Date(date), section }
      );
      alert("Class created successfully!");
      setClassName("");
      setCourseId("");
      setDate("");
    } catch (err) {
      console.error("Error creating class", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create class");
    }
  };

  return (
    <div className="create-class-container">
      <h1 className="create-class-title">🏫 Create Class</h1>

      <form onSubmit={handleCreateClass} className="create-class-form">
        <div className="form-group">
          <label>Select Course:</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class Title</label>
          <input
            type="text"
            placeholder="Enter class title"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Section</label>
          <input
            type="text"
            placeholder="Enter section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
