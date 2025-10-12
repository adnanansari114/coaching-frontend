import { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Link } from 'react-router-dom';
import '../styles/TeacherPages.css';

const TeacherList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get('/api/classes/teacher');
        setClasses(res.data);
      } catch (err) {
        setError('Failed to fetch classes.');
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Teacher Dashboard</h1>
      <div className="classes-list">
        <h2>My Classes</h2>
        {classes.length > 0 ? (
          <ul>
            {classes.map((c) => (
              <li key={c._id} className="class-item">
                <div className="class-info">
                  <h3>{c.title}</h3>
                  <p>Course: {c.course?.title || 'N/A'}</p>
                </div>
                <div className="class-actions">
                  <Link to={`/teacher-quizzes/${c._id}`} className="btn btn-secondary">
                    View Quizzes
                  </Link>
                  <Link to={`/add-students-to-class/${c._id}`} className="btn btn-secondary">
                    Manage Students
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not created any classes yet.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherList;