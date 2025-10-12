import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Link } from "react-router-dom";
import "../styles/StudentPages.css";

const StudentClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get(`/api/classes/my-classes`);
        setClasses(res.data.classes || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="classes-container">
      <h1 className="classes-title">My Classes</h1>

      {classes.length === 0 ? (
        <p className="no-classes">No classes assigned yet.</p>
      ) : (
        <ul className="classes-list">
          {classes.map((classId) => (
            <li key={classId._id} className="class-item">
              <div>
                <h2 className="class-name">{classId.title}</h2>
                <p className="class-teacher">
                  Teacher: {classId.teacher?.name || "Unknown"}
                </p>
              </div>
              <Link
                to={`/attendance-result?classId=${classId._id}`}
                className="btn"
              >
                View Attendance
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentClasses;
