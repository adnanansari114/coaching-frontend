import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const RealTimeQuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/quizzes/${quizId}`);
        setQuiz(res.data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz. It may not be available.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    const formattedAnswers = Object.keys(answers).map(questionId => ({
        questionId,
        selectedOption: answers[questionId],
    }));

    if (formattedAnswers.length !== quiz.questions.length) {
        alert("Please answer all questions.");
        return;
    }

    try {
      await API.post(`/api/quizzes/${quizId}/submit`, { answers: formattedAnswers });
      alert("Quiz submitted successfully!");
      // Navigate to the result page with the quizId
      navigate(`/quiz-result/${quizId}`);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert(err.response?.data?.message || "Failed to submit quiz.");
    }
  };

  if (loading) return <div className="page-container">Loading quiz...</div>;
  if (error) return <div className="page-container text-red-500">{error}</div>;
  if (!quiz) return <div className="page-container">Quiz not found.</div>;

  return (
    <div className="student-page-container">
      <h1 className="page-title">{quiz.title}</h1>
      <p className="mb-4">{quiz.description}</p>
      <form onSubmit={handleSubmit} className="real-quiz-form">
        {quiz.questions.map((q, index) => (
          <div key={q._id} className="question-card">
            <h3>{index + 1}. {q.questionText}</h3>
            <div className="options-group">
              {q.options.map((option, optIndex) => (
                <label key={optIndex} className="option-label">
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={option}
                    checked={answers[q._id] === option}
                    onChange={() => handleAnswerChange(q._id, option)}
                  />
                  {option}
                </label>
              ))}\
            </div>
          </div>
        ))}
        <button type="submit" className="btn mt-6">Submit Quiz</button>
      </form>
    </div>
  );
};

export default RealTimeQuizAttempt;