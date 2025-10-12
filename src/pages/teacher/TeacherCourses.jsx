import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await API.get(`/api/courses/teacher/courses`);
                setCourses(res.data.courses || []);
            } catch (err) {
                console.error("Error fetching courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleDeleteCourse = async (courseId, courseTitle) => {
  if (window.confirm(`Are you sure you want to delete the course "${courseTitle}"?`)) {
    try {
      await API.delete(`/api/courses/${courseId}`);
      alert("Course deleted successfully!");
      
    } catch (err) {
      console.error("Error deleting course", err);
      alert("Failed to delete course. Please try again.");
    }
  }
  fetchCourses();
};

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <div className="courses-container">
            <h1 className="courses-title">All Available Courses</h1>

            {courses.length === 0 ? (
                <p className="no-courses">No courses are available yet.</p>
            ) : (
                <div className="courses-grid">
                    {courses.map((c) => (
                        <div key={c._id} className="course-card">
                            <h2 className="course-title">{c.title}</h2>
                            <p className="course-description">{c.description}</p>
                            <p className="course-teacher">
                                Teacher: {c.teacher?.name || "Unknown"}
                            </p>

                            <div className="course-actions">
                                <Link
                                    to={`/student/notes?courseId=${c._id}`}
                                    className="btn"
                                >
                                    📄 View Notes
                                </Link>
                                <Link
                                    to={`/student/quizzes?courseId=${c._id}`}
                                    className="btn"
                                >
                                    ❓ View Quizzes
                                </Link>

                                <Link
                                    to={`/edit-course/${c._id}`}
                                    className="btn"
                                >
                                    ✏️ Edit Course
                                </Link>

                                {/* Delete button with an onClick handler */}
                                <button
                                    onClick={() => handleDeleteCourse(c._id, c.title)}
                                >
                                    🗑️ Delete Course
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllCourses;
