 import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../utils/api';
import '../styles/TeacherPages.css';

const TeacherQuizzes = () => {
  const { classId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get(`/api/quizzes/class/${classId}`);
        setQuizzes(res.data);
        if (res.data.length > 0) {
          setClassName(res.data[0].targetClass.title);
        }
      } catch (err) {
        setError('Failed to fetch quizzes.');
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [classId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="quizzes-container">
      <h1 className="quizzes-title">Quizzes for {className}</h1>
      <Link to="/create-realtime-quiz" className="btn btn-primary mb-3">
        Create New Quiz
      </Link>
      <div className="quizzes-list">
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                <div className="quiz-info">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                </div>
                <div className="quiz-actions">
                  <Link to={`/quiz-submissions/${quiz._id}`} className="btn btn-secondary">
                    View Submissions
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes found for this class.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherQuizzes;