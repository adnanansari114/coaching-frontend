import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ChangePassword from './components/ChangePassword';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import StudentReviewForm from './components/StudentReviewForm';
//admin
import AdminProfile from './pages/admin/AdminProfile';
import AdminApproval from './pages/admin/AdminApproval';
import AdminDashboard from './pages/admin/AdminDashboard';
import TermsAndConditions from './components/TermsAndConditions';

import UserDashboard from './pages/student/UserDashboard';
//student
import AttendanceResult from './pages/student/AttendanceResult';
import CourseReviews from './pages/student/CourseReviews';
import Notes from './pages/student/Notes';
import Quiz from './pages/student/Quiz';
import QuizAttempt from './pages/student/QuizAttempt';
import QuizResult from './pages/student/QuizResult'; // Import the new component
import RealTimeQuizAttempt from './pages/student/RealTimeQuizAttempt';
import StudentClasses from './pages/student/StudentClasses';
import StudentCourses from './pages/student/StudentCourses';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentNotes from './pages/student/StudentNotes';
import StudentProfile from './pages/student/StudentProfile';
import StudentQuizzes from './pages/student/StudentQuizzes';
import HomePage from './pages/student/HomePage';


//teacher
import AddCourse from './pages/teacher/AddCourse';
import AddStudentsToClass from './pages/teacher/AddStudentsToClass';
import Attendance from './pages/teacher/Attendance';
import CreateClass from './pages/teacher/CreateClass';
import CreateRealtimeQuiz from './pages/teacher/CreateRealtimeQuiz';
import EditCourse from './pages/teacher/EditCourse';
import NotesUpload from './pages/teacher/NotesUpload';
import QuizSubmissions from './pages/teacher/QuizSubmissions';
import TakeAttendance from './pages/teacher/TakeAttendance';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherList from './pages/teacher/TeacherList';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherQuizzes from './pages/teacher/TeacherQuizzes';
import TeacherReviews from './pages/teacher/TeacherReviews'; //teacher
import AddTopper from './pages/teacher/AddTopper';
import ToppersList from './pages/teacher/ToppersList';

  
// import ProfileEdit from './components/ProfileEdit';
// import QuizCreate from './pages/teacher/QuizCreate';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* admin */}
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-approval" element={<AdminApproval />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Student */}
        <Route path="/attendance-result" element={<AttendanceResult />} />
        <Route path="/course-reviews/:courseId" element={<CourseReviews />} />
        {/*  <Route path="/real-time-quiz-attempt" element={<RealTimeQuizAttempt />} /> */}
        <Route path="/notes" element={<Notes />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/student/quizzes" element={<QuizAttempt />} />
        <Route path="/quiz-result/:quizId" element={<QuizResult />} /> {/* New Route for quiz results */}
        <Route path="/student-classes" element={<StudentClasses />} />
        <Route path="/student-courses" element={<StudentCourses />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student/notes" element={<StudentNotes />} />
        <Route path="/student-profile" element={<StudentProfile />} />          
        <Route path='/student-quizzes' element={<StudentQuizzes />} />
        <Route path="/real-time-quiz-attempt/:quizId" element={<RealTimeQuizAttempt />} />
        

        

        
        {/* Teacher */}
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/addStudentstoclass" element={<AddStudentsToClass />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/create-class" element={<CreateClass />} />
        <Route path="/create-realtime-quiz" element={<CreateRealtimeQuiz />} />
        <Route path="/edit-course/:courseId" element={<EditCourse />} />
        <Route path="/notes-upload" element={<NotesUpload />} />
        <Route path="/quiz-submissions/:quizId" element={<QuizSubmissions />} />
        <Route path="/take-attendance" element={<TakeAttendance />} />
        <Route path="/teacher-course" element={<TeacherCourses />} /> 
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-list" element={<TeacherList />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/teacher-quizzes/:classId" element={<TeacherQuizzes />} />
        <Route path="/teacher-reviews" element={<TeacherReviews />} />

        <Route path='/add-topper' element={<AddTopper />} />
        <Route path='/home-page' element={<HomePage />} />
        <Route path='/toppers-list' element={< ToppersList />} />
        <Route path="/addStudentstoclass/:classId" element={<AddStudentsToClass />} />
    
        {/* <Route path="/profile-edit" element={<ProfileEdit />} /> */}
        {/* <Route path="/quiz-create" element={<QuizCreate />} /> */}
        
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
