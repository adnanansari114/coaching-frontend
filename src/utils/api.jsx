// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: 'https://coaching-backend-t04z.onrender.com', // 🔹 yaha apna backend ka base URL lagana
  headers: {
    "Content-Type": "application/json",
  }, 
});

// 🔹 request interceptor (auth token add karne ke liye)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000", // 🔹 yaha apna backend ka base URL lagana
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔹 request interceptor (auth token add karne ke liye)
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;



export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getProfile = () => API.get("/users/profile");
export const updateProfile = (data) => API.put("/users/profile", data);


// -------------------- USERS -------------------- //
export const getAllUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/users/${id}`);
export const deleteUser = (id) => API.delete(`/users/${id}`);


// -------------------- COURSES -------------------- //
export const getCourses = () => API.get("/courses");
export const getCourseById = (id) => API.get(`/courses/${id}`);
export const createCourse = (data) => API.post("/courses", data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);


// -------------------- QUIZZES -------------------- //
export const getQuizzes = () => API.get("/quizzes");
export const getQuizById = (id) => API.get(`/quizzes/${id}`);
export const createQuiz = (data) => API.post("/quizzes", data);
export const updateQuiz = (id, data) => API.put(`/quizzes/${id}`, data);
export const deleteQuiz = (id) => API.delete(`/quizzes/${id}`);

// Quiz attempts
export const attemptQuiz = (quizId, data) => API.post(`/quizzes/${quizId}/attempt`, data);
export const getQuizAttempts = (quizId) => API.get(`/quizzes/${quizId}/attempts`);


// -------------------- ENROLLMENTS -------------------- //
export const enrollInCourse = (courseId) => API.post(`/enrollments/${courseId}`);
export const getEnrollments = () => API.get("/enrollments");
export const removeEnrollment = (id) => API.delete(`/enrollments/${id}`);


// -------------------- REVIEWS -------------------- //
export const getReviews = (courseId) => API.get(`/reviews/${courseId}`);
export const addReview = (courseId, data) => API.post(`/reviews/${courseId}`, data);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);


// -------------------- TEACHER -------------------- //
export const getTeacherCourses = () => API.get("/teachers/courses");
export const addTeacherCourse = (data) => API.post("/teachers/courses", data);
export const updateTeacherCourse = (id, data) => API.put(`/teachers/courses/${id}`, data);
export const deleteTeacherCourse = (id) => API.delete(`/teachers/courses/${id}`);


// -------------------- ADMIN -------------------- //
export const getAdminDashboard = () => API.get("/admin/dashboard");
export const approveTeacher = (id) => API.put(`/admin/approve/${id}`);
export const rejectTeacher = (id) => API.put(`/admin/reject/${id}`);
export const getPendingApprovals = () => API.get("/admin/pending");


// -------------------- ATTENDANCE -------------------- //
export const createAttendance = (data) => API.post("/classes/attendance", data);
export const getAttendance = (classId) => API.get(`/classes/${classId}/attendance`);
export const markAttendance = (classId, data) => API.post(`/classes/${classId}/mark`, data);


