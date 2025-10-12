import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import '../styles/StudentPages.css';

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try { 
        setLoading(true);
        const res = await API.get('/api/quizzes');
        setQuizzes(res.data);
      } catch (err) {
        console.error("Error fetching student quizzes:", err);
        setError("Failed to fetch quizzes.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div className="page-container">Loading quizzes...</div>;
  if (error) return <div className="page-container text-red-500">{error}</div>;

  return (
    <div className="student-page-container">
      <h1 className="page-title">Available Quizzes</h1>
      {quizzes.length === 0 ? (
        <p>No quizzes available at the moment.</p>
      ) : (
        <div className="quizzes-list">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h2 className="text-lg font-bold">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
              <p className="quiz-class">Class: {quiz.targetClass.title}</p>
              <Link to={`/real-time-quiz-attempt/${quiz._id}`} className="btn">
                Attempt Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentQuizzes;