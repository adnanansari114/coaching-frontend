import { Link } from "react-router-dom";
import "../styles/StudentPages.css";

const UserDashboard = () => {


  return (
    <div className="page-container">
      <h1 className="page-title">User Dashboard</h1>

      <div className="dashboard-grid">
        {/* Profile */}
        <Link to="/student-profile" className="card">
          <h2 className="card-title">👤 Profile</h2>
          <p className="card-subtext">View and update your personal details.</p>
        </Link>

        {/* Enrolled Courses */}
        <Link to="/student-courses" className="card">
          <h2 className="card-title">📚 Enrolled Courses</h2>
          <p className="card-subtext">See all the courses you are enrolled in.</p>
        </Link>

        {/* Notes & PDFs */}
        <Link to="/notes" className="card">
          <h2 className="card-title">📝 Notes / PDFs</h2>
          <p className="card-subtext">
            Download notes and study materials uploaded by teachers.
          </p>
        </Link>

        {/* Attendance */}
        <Link to="/quiz" className="card">
          <h2 className="card-title">✅ Quiz</h2>
          <p className="card-subtext">View your attendance record.</p>
        </Link>
      </div>

    </div>
  );
};

export default UserDashboard;
