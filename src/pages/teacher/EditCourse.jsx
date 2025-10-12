import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import "../styles/TeacherPages.css";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch course details on load
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/api/courses/${courseId}`);
        const course = res.data;
        setTitle(course.title);
        setDescription(course.description);
        setNotes(course.notes || []);
        setQuiz(course.quiz || []);
      } catch (err) {
        console.error("Error fetching course:", err);
        alert("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Add a new empty note
  const handleAddNote = () => {
    setNotes([...notes, { title: "", content: "" }]);
  };

  // Add a new empty quiz question
  const handleAddQuiz = () => {
    setQuiz([...quiz, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  // Handle note change
  const handleNoteChange = (index, field, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index][field] = value;
    setNotes(updatedNotes);
  };

  // Handle quiz change
  const handleQuizChange = (index, field, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index][field] = value;
    setQuiz(updatedQuiz);
  };

  // Handle quiz option change
  const handleQuizOptionChange = (qIndex, optIndex, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[qIndex].options[optIndex] = value;
    setQuiz(updatedQuiz);
  };

  // Save updates
  const handleSave = async () => {
    try {
      await API.put(`/api/courses/${courseId}`, {
        title,
        description,
        notes,
        quiz,
      });
      alert("Course updated successfully!");
      navigate("/teacher-course");
    } catch (err) {
      console.error("Error updating course:", err);
      alert("Failed to update course.");
    }
  };

  if (loading) return <p>Loading course...</p>;

  return (
    <div className="edit-course-container">
      <h1>Edit Course</h1>

      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <h2>Notes</h2>
      {notes.map((note, idx) => (
        <div key={idx} className="note-block">
          <input
            type="text"
            placeholder="Note Title"
            value={note.title}
            onChange={(e) => handleNoteChange(idx, "title", e.target.value)}
          />
          <textarea
            placeholder="Note Content"
            value={note.content}
            onChange={(e) => handleNoteChange(idx, "content", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddNote}>➕ Add Note</button>

      <h2>Quiz</h2>
      {quiz.map((q, qIdx) => (
        <div key={qIdx} className="quiz-block">
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuizChange(qIdx, "question", e.target.value)}
          />
          {q.options.map((opt, optIdx) => (
            <input
              key={optIdx}
              type="text"
              placeholder={`Option ${optIdx + 1}`}
              value={opt}
              onChange={(e) =>
                handleQuizOptionChange(qIdx, optIdx, e.target.value)
              }
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) =>
              handleQuizChange(qIdx, "correctAnswer", e.target.value)
            }
          />
        </div>
      ))}
      <button onClick={handleAddQuiz}>➕ Add Quiz Question</button>

      <div className="form-actions">
        <button onClick={handleSave}>💾 Save Changes</button>
      </div>
    </div>
  );
};

export default EditCourse;
