import { Link } from "react-router-dom";
import "../styles/StudentPages.css";
import API from '../../utils/api'

const TeacherDashboard = () => {

  return (
    <div className="page-container">
      <h1 className="page-title">Teacher Dashboard</h1>

      <div className="dashboard-grid">
        {/* Profile */}
        <Link to="/teacher-profile" className="card">
          <h2 className="card-title">👤 Profile</h2>
          <p className="card-subtext">
            Update your personal details and account settings.
          </p>
        </Link>

        {/* Upload Course */}
        <Link to="/add-course" className="card">
          <h2 className="card-title">📚 Upload Course</h2>
          <p className="card-subtext">
            Create and upload new courses for students.
          </p>
        </Link>


        {/* Teacher Course */}
        <Link to="/teacher-course" className="card">
          <h2 className="card-title">📚 Teacher Course</h2>
          <p className="card-subtext">
            Courses for students.
          </p>
        </Link>
          

        {/* Upload Notes */}
        <Link to="/notes-upload" className="card">
          <h2 className="card-title">📝 Upload Notes/PDF</h2>
          <p className="card-subtext">
            Share notes, PDFs, or study material for your courses.
          </p>
        </Link>

        {/* Real-Time Quiz */}
        <Link to="/create-realtime-quiz" className="card">
          <h2 className="card-title">⏱️ Real-Time Quiz</h2>
          <p className="card-subtext">
            Schedule real-time quizzes with start and end time (only for
            students).
          </p>
        </Link>

        {/* Create Class */}
        <Link to="/create-class" className="card">
          <h2 className="card-title">🏫 Create Class</h2>
          <p className="card-subtext">
            Form a class and add students to manage them together.
          </p>
        </Link>

        {/* Take Attendance */}
        <Link to="/take-attendance" className="card">
          <h2 className="card-title">✅ Take Attendance</h2>
          <p className="card-subtext">
            Mark attendance for students in your classes.
          </p>
        </Link>

        {/* Add Students to Class */}
        <Link to="/addStudentstoclass" className="card">
          <h2 className="card-title">✅ Add Attendance</h2>
          <p className="card-subtext">Add students in classes.</p>
        </Link>

        {/* Add Students to Class */}
        <Link to="/teacher-list" className="card">
          <h2 className="card-title">✅ Quiz Result</h2>
          <p className="card-subtext">View and manage all quiz results.</p>
        </Link>

        {/* Add Students to Class */}
        <Link to="/teacher-reviews" className="card">
          <h2 className="card-title">✅ Teacher Reviews</h2>
          <p className="card-subtext">View and manage all teacher reviews.</p>
        </Link>

        {/* Add topper student list */}
        <Link to="/add-topper" className="card">
          <h2 className="card-title">Add Topper </h2>
          <p className="card-subtext">View and manage all teacher reviews.</p>
        </Link> 


        {/* topper form */}
        <Link to="/toppers-list" className="card">
          <h2 className="card-title">Topper list</h2>
          <p className="card-subtext">View and manage all teacher reviews.</p>
        </Link>
              {/* change password */}
        <Link to="/change-password" className="card">
          <h2 className="card-title">📝 Change Password</h2>
          <p className="card-subtext">
            Update your account password.
          </p>
        </Link>
        
      </div>
    </div>
  );
};

export default TeacherDashboard;
