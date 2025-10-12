import { useEffect, useMemo, useState } from "react";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const TakeAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true);
        const res = await API.get(`/api/classes/teacher/`);
        setClasses(res.data || []);
      } catch (err) {
        console.error("Error fetching classes", err?.response?.data || err);
        alert("Failed to load classes. Please try again.");
      } finally {
        setLoadingClasses(false);
      }
    };
    if (token) fetchClasses();
  }, [token]);

  const handleSelectClass = async (classId) => {
    setSelectedClassId(classId);
    setStudents([]);
    setAttendance({});
    if (!classId) return;

    try {
      setLoadingStudents(true);
      const res = await API.get(`/api/classes/${classId}/students`);
      const classStudents = res.data || [];
      const studentsList = classStudents.map((item) => item.student);
      setStudents(studentsList);

      const initial = {};
      studentsList.forEach((s) => {
        initial[s._id] = "present";
      });
      setAttendance(initial);
    } catch (err) {
      console.error("Error loading students", err?.response?.data || err);
      alert("Failed to load students");
    } finally {
      setLoadingStudents(false);
    }
  };

  const setStatus = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClassId) return alert("Please select a class first.");

    const attendanceData = Object.entries(attendance).map(
      ([studentId, status]) => ({
        studentId,
        status,
      })
    );
    if (attendanceData.length === 0) return alert("No students to submit.");

    try {
      setSubmitting(true);
      const date = new Date().toISOString().split("T")[0];
      await API.post(
        `/api/classes/${selectedClassId}/attendance`,
        { attendanceData, date }
      );
      alert("Attendance submitted successfully!");
      setStudents([]);
      setAttendance({});
      setSelectedClassId("");
    } catch (err) {
      console.error("Error submitting attendance", err?.response?.data || err);
      alert("Failed to submit attendance");
    } finally {
      setSubmitting(false);
    }
  };

  const classLabel = useMemo(() => {
    if (!Array.isArray(classes)) return "";
    const cls = classes.find((c) => c._id === selectedClassId);
    if (!cls) return "";
    const courseTitle = typeof cls.course === "object" ? cls.course?.title : "";
    const dateStr = cls.date ? new Date(cls.date).toLocaleDateString() : "";
    return `${cls.title || "Class"} ${
      courseTitle ? `— ${courseTitle}` : ""
    } ${dateStr ? `(${dateStr})` : ""}`;
  }, [classes, selectedClassId]);

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">📋 Take Attendance</h1>

      <div className="form-group">
        <label>Select Class</label>
        <select
          disabled={loadingClasses}
          value={selectedClassId}
          onChange={(e) => handleSelectClass(e.target.value)}
        >
          <option value="">
            {loadingClasses ? "Loading..." : "-- Choose Class --"}
          </option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
              {typeof c.course === "object" && c.course?.title
                ? ` — ${c.course.title}`
                : ""}
              {c.date ? ` (${new Date(c.date).toLocaleDateString()})` : ""}
            </option>
          ))}
        </select>
      </div>

      {selectedClassId && (
        <div className="class-label">
          <span>Selected:</span> {classLabel || "-"}
        </div>
      )}

      {loadingStudents && <div className="info-msg">Loading students…</div>}

      {students.length > 0 && !loadingStudents && (
        <form onSubmit={handleSubmit}>
          <div className="attendance-table">
            <div className="attendance-header">
              <div>Student</div>
              <div>Email</div>
              <div>Status</div>
            </div>

            {students.map((s) => (
              <div key={s._id} className="attendance-row">
                <div>{s.name || "—"}</div>
                <div>{s.email || "—"}</div>
                <div className="status-options">
                  <label>
                    <input
                      type="radio"
                      name={`att-${s._id}`}
                      value="present"
                      checked={attendance[s._id] === "present"}
                      onChange={() => setStatus(s._id, "present")}
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`att-${s._id}`}
                      value="absent"
                      checked={attendance[s._id] === "absent"}
                      onChange={() => setStatus(s._id, "absent")}
                    />
                    Absent
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={submitting} className="btn">
            {submitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      )}

      {!loadingStudents && selectedClassId && students.length === 0 && (
        <div className="info-msg">No students found for this class.</div>
      )}
    </div>
  );
};

export default TakeAttendance;
