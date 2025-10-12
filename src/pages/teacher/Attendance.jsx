import React, { useEffect, useState } from 'react';
// import '../styles/Attendance.css';
import API from '../../utils/api';

export default function Attendance() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch teacher's classes
  useEffect(() => {
    async function fetchClasses(userId) {
      setLoading(true);
      setError('');
      try {
        const res = await API.get(`/api/classes/teacher/${userId}`);
        if (!res.data) {
          setError(res.data.message || 'Failed to fetch classes.');
        } else {
          setClasses(res.data.classes || []);
        }
      } catch (err) {
        setError('Server error.');
      }
      setLoading(false);
    }
    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    async function fetchStudents() {
      setLoading(true);
      setError('');
      try {
        const res = await API.get(`http://localhost:5000/api/classes/${selectedClass}/students`);
        if (!res.data) {
          setError(res.data.message || 'Failed to fetch students.');
        } else {
          setStudents(res.data.students || []);
          const initialAttendance = {};
          (data.students || []).forEach(s => { initialAttendance[s._id] = false; });
          setAttendance(initialAttendance);
        }
      } catch (err) {
        setError('Server error.');
      }
      setLoading(false);
    }
    fetchStudents();
  }, [selectedClass]);

  const handleAttendanceChange = (studentId) => {
    setAttendance({ ...attendance, [studentId]: !attendance[studentId] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await API.post(`http://localhost:5000/api/classes/${selectedClass}/attendance`, {
          attendance 
      });
      if (!res.data) {
        setError(res.data.message || 'Failed to submit attendance.');
      } else {
        setSuccess('Attendance submitted successfully!');
      }
    } catch (err) {
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="attendance-container">
      <h2>Take Attendance</h2>
      <a href="/attendance-result">Go to Attendance Result</a>
      {error && <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>}
      {success && <div style={{ color: 'green', margin: '1rem 0' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Select Class:
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
        </label>
        {students.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Student Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={attendance[student._id] || false}
                      onChange={() => handleAttendanceChange(student._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {students.length > 0 && (
          <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'Submitting...' : 'Submit Attendance'}
          </button>
        )}
      </form>
    </div>
  );
}
