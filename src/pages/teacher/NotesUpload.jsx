import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import "../styles/TeacherPages.css";

const NotesUpload = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [noteFile, setNoteFile] = useState(null);
  const [notesTitle, setNotesTitle] = useState("");
  const [notesContent, setNotesContent] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/api/courses/teacher/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return alert("Please select a course first!");

    const formData = new FormData();
    const notesObj = {
      title: notesTitle || "Untitled Notes",
      content: notesContent || "",
    };
    formData.append("notes", JSON.stringify(notesObj));

    try {
      if (quiz) {
        JSON.parse(quiz);
        formData.append("quiz", quiz);
      }
    } catch {
      return alert("Quiz must be valid JSON array!");
    }

    if (noteFile) formData.append("pdfFile", noteFile);

    try {
      setLoading(true);
      await API.put(`/api/courses/${selectedCourse}/add-content`, formData);
      alert("Notes/Quiz uploaded successfully!");
      setNoteFile(null);
      setNotesTitle("");
      setNotesContent("");
      setQuiz("");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notes-upload-container">
      <h2 className="notes-upload-title">📑 Upload Notes & Quizzes</h2>

      <form onSubmit={handleSubmit} className="notes-upload-form">
        <div className="form-group">
          <label>Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Choose a course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title} ({course.subject})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Notes Title</label>
          <input
            type="text"
            value={notesTitle}
            onChange={(e) => setNotesTitle(e.target.value)}
            placeholder="e.g. Chapter 1 - Introduction"
            required
          />
        </div>

        <div className="form-group">
          <label>Notes Content</label>
          <textarea
            placeholder="Additional notes or description"
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Upload Notes File (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setNoteFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Add Quiz (JSON format)</label>
          <textarea
            placeholder='[{"question":"Q?","options":["A","B"],"correctAnswer":"A"}]'
            value={quiz}
            onChange={(e) => setQuiz(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" disabled={loading} className="btn">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default NotesUpload;
