import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdEmail } from "react-icons/md";
import { FaAddressCard, FaPhoneSquareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../utils/api"; // ✅ import axios instance

export const Footer = () => {
  const { messages, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });
  const [courses, setCourses] = useState([]); // ✅ state for dynamic courses

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/api/courses/teacher/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, address, message } = formData;
    await messages(name, email, address, message);
    if (!error) {
      alert("Message sent successfully!");
    } else {
      alert(error);
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footersec">
          {/* ====== FOOTER ONE ====== */}
          <div className="footer-sec-one">
            <h2>About Zenith Education</h2>
            <p>
              At Zenith Education, we are dedicated to providing quality
              education to students from class 8 to 12. Our experienced teachers
              specialize in English, Mathematics, Science, Physics, Chemistry,
              and Commerce subjects.
            </p>
            <div className="about-icon">
              <i className="fa fa-facebook" aria-hidden="true"></i>
              <i className="fa fa-youtube" aria-hidden="true"></i>
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
          </div>

          {/* ====== FOOTER TWO (Dynamic Courses) ====== */}
          <div className="footer-two">
            <h2>Courses</h2>
            {courses.length > 0 ? (
              <ul>
                {courses.map((course) => (
                  <li key={course._id}>
                    <Link to={`/student/notes?courseId=${course._id}`}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses available.</p>
            )}
          </div>

          {/* ====== FOOTER THREE (Top Courses or Terms & Conditions) ====== */}
          <div className="footer-three">
            <h2>Terms & Conditions</h2>
            <p>
              By accessing this website, you agree to comply with our terms and
              conditions. All information, content, and materials are the
              property of Zenith Education and are protected by copyright laws.
            </p>
          </div>

          {/* ====== FOOTER FOUR ====== */}
          <div className="footer-four">
            <h2>Contact</h2>
            <p>
              <FaAddressCard /> 123 Main Street, City, Country
            </p>
            <p>
              <MdEmail /> info@zenitheducation.com
            </p>
            <p>
              <FaPhoneSquareAlt /> Phone: +123 456 7890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
