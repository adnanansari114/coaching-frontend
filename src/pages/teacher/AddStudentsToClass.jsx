import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const AddStudentsToClass = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [studentsToAdd, setStudentsToAdd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const classesRes = await API.get(`/api/classes/teacher`);
        setClasses(classesRes.data || []);

        const usersRes = await API.get("/api/users/allusers");
        const studentsList = (usersRes.data || []).filter(
          (user) => user.role === "student"
        );
        setAllStudents(studentsList);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const handleSelectClass = (classId) => {
    setSelectedClassId(classId);
    setStudentsToAdd([]);
  };

  const handleStudentToggle = (studentEmail) => {
    setStudentsToAdd((prev) =>
      prev.includes(studentEmail)
        ? prev.filter((email) => email !== studentEmail)
        : [...prev, studentEmail]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClassId || studentsToAdd.length === 0) {
      return alert("Please select a class and at least one student.");
    }

    try {
      setSubmitting(true);
      await API.post(
        `/api/classes/${selectedClassId}/add-students`,
        { studentEmails: studentsToAdd }
      );
      alert("Students added to class successfully!");
      setStudentsToAdd([]);
    } catch (err) {
      console.error("Error adding students to class:", err);
      alert(err.response?.data?.message || "Failed to add students to class.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-students-container">
      <h1 className="add-students-title">👩‍🎓 Add Students to Class</h1>
      <form onSubmit={handleSubmit} className="add-students-form">
        <div className="form-group">
          <label>Select Class:</label>
          <select
            value={selectedClassId}
            onChange={(e) => handleSelectClass(e.target.value)}
          >
            <option value="">-- Select a Class --</option>
            {loading ? (
              <option disabled>Loading classes...</option>
            ) : (
              classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.title} ({new Date(cls.date).toLocaleDateString()})
                </option>
              ))
            )}
          </select>
        </div>

        {selectedClassId && (
          <div className="students-list">
            <h2>Select Students to Add:</h2>
            <div className="students-scroll">
              {loading ? (
                <p>Loading students...</p>
              ) : allStudents.length === 0 ? (
                <p>No students found.</p>
              ) : (
                allStudents.map((student) => (
                  <div key={student._id} className="student-item">
                    <input
                      type="checkbox"
                      id={student._id}
                      checked={studentsToAdd.includes(student.email)}
                      onChange={() => handleStudentToggle(student.email)}
                    />
                    <label htmlFor={student._id}>
                      {student.name} ({student.email})
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !selectedClassId || studentsToAdd.length === 0}
          className="btn"
        >
          {submitting ? "Adding..." : "Add Students"}
        </button>
      </form>
    </div>
  );
};

export default AddStudentsToClass;
