import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const StudentNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    const fetchNotes = async () => {
      if (!courseId) return;

      try {
        const res = await API.get(`/api/courses/${courseId}/notes`);
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [courseId]);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="notes-page">
      <h1 className="notes-heading">📖 Course Notes</h1>

      {notes.length === 0 ? (
        <p className="no-notes">No notes available for this course.</p>
      ) : (
        <div className="notes-content">
          {notes.map((note) => (
            <section key={note._id} className="note-section">
              <h2 className="note-title">{note.title}</h2>
              <div className="note-text">{note.content}</div>
              {note.pdfPath && (
                <p>
                  <a
                    href={`http://localhost:5000/api/courses/${courseId}/notes/${note._id}/download`}
                    className="btn"
                    download
                  >
                    📄 Download PDF
                  </a>
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotes;
