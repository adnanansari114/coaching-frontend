// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/Navbar.css';
// import { LuSquareMenu } from "react-icons/lu";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   let user = null;
//   try {
//     user = JSON.parse(localStorage.getItem('user'));
//   } catch (e) {
//     user = null;
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav>
//       <div className="navbar">
//         <div className="logo">
//           <img src="/images/logo.jpg" id="logo" alt="Zenith Edi" />
//           {/* <div className="logo-icon">
//             <i className="fa fa-facebook animate__animated animate_-fadeOut wow" aria-hidden="true"></i>
//             <i className="fa fa-linkedin animate__animated animate_-fadeOut wow" aria-hidden="true"></i>
//             <i className="fa fa-twitter animate__animated animate_-fadeOut wow" aria-hidden="true"></i>
//             <i className="fa fa-youtube animate__animated animate_-fadeOut wow" aria-hidden="true"></i>
//           </div> */}
//         </div>
//         <i className="fa fa-bars" id="myicon" aria-hidden="true"><LuSquareMenu /></i>
//         <input type="checkbox" name="" id="chk" />
//         <div className="middle-nav">
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             {!token && <>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/register">Register</Link></li>
//             </>}

//             {token && user && user.role === 'admin' && (
//               <>
//                 <li><Link to="/admin-profile">Admin</Link></li>
//                 <li><Link to="/admin-approval">User Approval</Link></li>
//                 <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
//               </>
//             )}

//             {token && user && user.role === 'teacher' && (
//               <>
//                 <li><Link to="/teacher-dashboard">Teacher</Link></li>
//                 <li><Link to="/add-course">Add Course</Link></li>
//               </>
//             )}

//             {token && user && user.role === 'student' && (
//               <>
//                 <li><Link to="/student-dashboard">Student</Link></li>
//                 <li><Link to="/student-classes">Student class</Link></li>
//                 <li><Link to="/student-courses">Student courses</Link></li>
//                 <li><Link to="real-time-quiz-attempt">RealTimeQuizzes</Link></li>
//               </>
//             )}
//               <li><Link to="/terms-and-conditions">T&D </Link></li>
//             {token && user && user.role === 'user' && (
//               <>
//                 <li><Link to="/user-dashboard">Student</Link></li>
//                 <li><Link to="/student-courses">Student courses</Link></li>
//               </>
//             )}

//             {token && user && (
//               <>
//                 <li><button id='logout' onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button></li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { LuSquareMenu } from "react-icons/lu";

export default function Navbar() {

  return (
    <nav>
      
    </nav>
  );
}