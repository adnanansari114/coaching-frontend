import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const QuizAttempt = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/api/courses/${courseId}/notes`);
        setQuiz(res.data.quiz || []);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };

    if (courseId) {
      fetchQuiz();
    }
  }, [courseId]);

  const handleOptionChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = async () => {
    try {
      const answersArray = Object.values(answers);
      const res = await API.post(`/api/courses/${courseId}/quiz/submit`, {
        answers: answersArray,
      });

      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (!quiz) return <p className="loading-text">Loading...</p>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">📝 Quiz</h1>

      {submitted ? (
        <div className="quiz-result">
          <h2>✅ Quiz Submitted!</h2>
          <p>
            Your Score: <strong>{score}</strong> / {quiz.length}
          </p>
        </div>
      ) : (
        <div>
          {quiz.length === 0 ? (
            <p className="no-quiz">No quizzes available for this course.</p>
          ) : (
            <div className="quiz-questions">
              {quiz.map((q, idx) => (
                <div key={q._id} className="quiz-question">
                  <h3>
                    Q{idx + 1}. {q.question}
                  </h3>
                  <div className="quiz-options">
                    {q.options.map((opt, i) => (
                      <label key={i} className="quiz-option">
                        <input
                          type="radio"
                          name={`q-${q._id}`}
                          value={opt}
                          onChange={() => handleOptionChange(q._id, opt)}
                          checked={answers[q._id] === opt}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={handleSubmit} >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
