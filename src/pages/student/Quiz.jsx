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
        const res = await API.get(`/api/courses`);
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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

              <div className="course-actions">
                <Link
                  to={`/student/quizzes?courseId=${c._id}`}
                  className="btn"
                >
                  ❓ View Quizzes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
