import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';
import '../styles/StudentPages.css';

const QuizResult = () => {
    const { quizId } = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await API.get(`/api/quizzes/${quizId}/result`);
                setSubmission(res.data);
            } catch (err) {
                console.error("Error fetching quiz result:", err);
                setError(err.response?.data?.message || "Failed to fetch quiz result.");
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [quizId]);

    if (loading) {
        return <div className="page-container">Loading result...</div>;
    }

    if (error) {
        return <div className="page-container text-red-500">{error}</div>;
    }

    if (!submission) {
        return <div className="page-container">No submission found for this quiz.</div>;
    }

    return (
        <div className="result-container">
            <h1 className="page-title">Quiz Result: {submission.quiz.title}</h1>
            <div className="result-summary">
                <p>Your Score: <strong>{submission.score} / {submission.totalQuestions}</strong></p>
                <p>Submitted On: {new Date(submission.submittedAt).toLocaleString()}</p>
            </div>

            <div className="answers-review mt-8">
                <h2 className="text-xl font-bold mb-4">Your Answers:</h2>
                {submission.answers.map((ans, index) => {
                    const question = submission.quiz.questions.find(q => q._id === ans.questionId);
                    if (!question) return null; // Fallback if question is not found

                    const isCorrect = ans.selectedOption === question.correctAnswer;
                    const cardClass = isCorrect ? 'correct-answer-card' : 'incorrect-answer-card';

                    return (
                        <div key={index} className={`question-review-card ${cardClass}`}>
                            <p><strong>Question {index + 1}:</strong> {question.questionText}</p>
                            <p className="mt-2"><strong>Your Answer:</strong> {ans.selectedOption}</p>
                            <p className="mt-1"><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizResult;