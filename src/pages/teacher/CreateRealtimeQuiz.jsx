import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../styles/TeacherPages.css";

const CreateRealtimeQuiz = () => {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/api/classes/teacher");
        setClasses(res.data || []);
      } catch (err) {
        console.error("Error fetching classes", err);
      }
    };
    fetchClasses();
  }, []);

  const handleQuestionChange = (i, field, value) => {
    const newQ = [...questions];
    newQ[i][field] = value;
    setQuestions(newQ);
  };

  const handleOptionChange = (qi, oi, value) => {
    const newQ = [...questions];
    newQ[qi].options[oi] = value;
    setQuestions(newQ);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classId) {
      alert("Please select a class.");
      return;
    }
    const hasEmptyFields = questions.some(
      (q) =>
        !q.questionText ||
        !q.correctAnswer ||
        q.options.some((o) => !o)
    );
    if (questions.length === 0 || hasEmptyFields) {
      alert("Please fill all fields for all questions.");
      return;
    }
    
    const isCorrectAnswerValid = questions.every(q => q.options.includes(q.correctAnswer));
    if(!isCorrectAnswerValid) {
        alert("The correct answer for each question must be one of the provided options.");
        return;
    }

    try {
      await API.post(
      "/api/quizzes",
        {
          title,
          description,
          targetClassId: classId,
          questions,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        }
      );
      alert("Real-time quiz created successfully! 🎉");
      setTitle("");
      setDescription("");
      setClassId("");
      setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error("Error creating real-time quiz", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Create Real-Time Quiz</h1>

      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label>Select Class</label>
          <select value={classId} onChange={(e) => setClassId(e.target.value)} required>
            <option value="">-- Choose Class --</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title} ({c.course?.title || "No Course Title"})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quiz description..."
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div className="questions-section">
          <h2>Questions</h2>
          {questions.map((q, qi) => (
            <div key={qi} className="question-card">
              <input
                type="text"
                placeholder="Enter question"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qi, "questionText", e.target.value)
                }
              />
              {q.options.map((opt, oi) => (
                <input
                  key={oi}
                  type="text"
                  placeholder={`Option ${oi + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qi, oi, e.target.value)}
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qi, "correctAnswer", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="btn-secondary">
            ➕ Add Question
          </button>
        </div>

        <button type="submit" className="btn">
          Create Realtime Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateRealtimeQuiz;