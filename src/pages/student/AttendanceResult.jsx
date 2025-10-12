import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const AttendanceResult = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");
  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!classId || !studentId) {
        setLoading(false);
        setError("Class or student ID is missing.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await API.get(`/api/classes/${classId}/attendance`);
        setAttendance(res.data || []);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch attendance records."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [classId, studentId]);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">📊 My Attendance</h1>

      {attendance.length === 0 ? (
        <p className="no-attendance">
          No attendance records found for this class.
        </p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a._id}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td className={a.status === "present" ? "present" : "absent"}>
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceResult;
