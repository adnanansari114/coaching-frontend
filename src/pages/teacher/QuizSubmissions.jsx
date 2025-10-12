import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';
import { socket } from '../../socket';
import '../styles/TeacherPages.css';

const QuizSubmissions = () => {
  const { quizId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get(`/api/quizzes/${quizId}/submissions`);
        setSubmissions(res.data);
      } catch (err) {
        setError('Failed to fetch submissions.');
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();

    if (!socket.connected) {
        socket.connect();
    }

    const handleNewSubmission = (data) => {
        console.log("New submission received:", data);
        fetchSubmissions(); 
    };

    socket.on('studentQuizSubmitted', handleNewSubmission);

    return () => {
        socket.off('studentQuizSubmitted', handleNewSubmission);
        socket.disconnect();
    };
  }, [quizId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="submissions-container">
      <h1 className="submissions-title">Quiz Submissions</h1>
      <div className="submissions-list">
        {submissions.length > 0 ? (
          <ul>
            {submissions.map((submission) => (
              <li key={submission._id} className="submission-item">
                <h3>Student: {submission.student.name}</h3>
                <p>Email: {submission.student.email}</p>
                <p>Score: {submission.score} / {submission.totalQuestions}</p>
                <p>Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuizSubmissions;