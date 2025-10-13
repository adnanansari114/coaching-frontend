import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Navbar.css';
import API from "../utils/api";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiTestcafe } from "react-icons/si";
import { MdSubject } from "react-icons/md";
import { MdMapsHomeWork } from "react-icons/md";
import StudentCourses from '../pages/student/StudentCourses';

export default function Home() {
  const [toppers, setToppers] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const detailRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  const slideBackgrounds = ["background-1", "background-2", "background-3"];

  useEffect(() => {
    const changeSlide = () => {
      setSlideIndex((index) => (index + 1) % slideBackgrounds.length);
    };

    const interval = setInterval(changeSlide, 4000);

    return () => clearInterval(interval); 
  }, [slideBackgrounds.length]);

  const currentSlide = (n) => {
    setSlideIndex(n - 1);
  };

  const animateCountUp = (el, target, duration) => {
    let start = 0;
    const increment = target / (duration / 100);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        el.textContent = target + "+"; // Ensure the final number matches the target
      } else {
        el.textContent = Math.floor(start);
      }
    }, 100);
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const startCounting = () => {
  detailRefs.current.forEach((ref) => {
    if (ref && !ref.counted) { // ✅ only if not counted yet
      const target = parseInt(ref.getAttribute("data-target"));
      const duration = 2000;
      if (isElementInViewport(ref)) {
        animateCountUp(ref, target, duration);
        ref.counted = true; // ✅ mark as counted
      }
    }
  });
};

  useEffect(() => {
    window.addEventListener("scroll", startCounting);
    window.addEventListener("load", startCounting);

    return () => {
      window.removeEventListener("scroll", startCounting);
      window.removeEventListener("load", startCounting);
    };
  }, []);


  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const res = await API.get("/api/toppers/getToppers");
        setToppers(res.data);
      } catch (err) {
        console.error("Error fetching toppers:", err);
      }
    };
    fetchToppers();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= toppers.length - visibleCards) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000); 

    return () => clearInterval(slideInterval);
  }, [toppers.length]);

  const offset = (currentIndex * 100) / visibleCards;

  return (
    <div>
      <header id="header" className={`index-nav ${slideBackgrounds[slideIndex]}`}>
        <div className="banner">
          <div className="container">
            <div className="banner-content animate__animated animate__fadeInDown wow">
              <a className="animate__animated animate__fadeInDown wow" id="life-coach" href="">ZENITH EDUCATION</a>
              <h1 className="banner-heading animate__animated animate__fadeInDown wow">Empowering Students from Class 8 to 12</h1>
              <p className="animate__animated animate__fadeInDown wow">Join us to excel in English, Mathematics, Science, Physics, Chemistry, and Commerce.</p>
              <a className="animate__animated animate__fadeIn wow" id="guide" href="">Get Started Today</a>
            </div>
          </div>
        </div>
      </header>

      <section id="contact">
        <div className="container" />
        <div className="contact-us">
          <div className="contact-card animate__animated animate__fadeInDown wow ">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <div className="phone">
              <h3>Call us: +91 12233 4555</h3>
              <p>198, west of street, Madhya Pradesh, India </p>
            </div>
          </div>
          <div className="contact-card animate__animated animate__fadeInDown wow ">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            <div className="phone">
              <h3>Opening Hours</h3>
              <p>Mon - Sat 7:00AM - 8:00PM</p>
            </div>
          </div>
          <div className="contact-card animate__animated animate__fadeInDown wow ">
            <div className="contact-btn-one">
              {/* <a href><Link to='/appointment' onClick={handleAppointmentClick}>Make an appointment</Link></a> */}
            </div>
          </div>
        </div>
      </section>

      <section >
        <div className="container" />
        <div className="explore">
          <div className="explore-content">
            <div className="explore-btn">
              <a className="animate__animated animate__fadeInDown wow" href="">Explore</a>
            </div>
            <h1 className="animate__animated animate__fadeInDown wow">Subjects We Teach</h1>
            <p className="animate__animated animate__fadeInDown wow">Empowering students in various subjects.</p>
          </div>
          < StudentCourses />
        </div>
      </section>

      <section id="detail">
        <div className="containertwo">
          <div className="detail-sec">
            <div className="detail-card">
              <p ref={(el) => (detailRefs.current[0] = el)} data-target="500">0</p>
              <h5>HAPPY STUDENTS</h5>
            </div>
            <div className="detail-card">
              <p ref={(el) => (detailRefs.current[1] = el)} data-target="70">0</p>
              <h5>COURSES OFFERED</h5>
            </div>
            <div className="detail-card">
              <p ref={(el) => (detailRefs.current[2] = el)} data-target="100">0</p>
              <h5>SATISFACTION</h5>
            </div>
            <div className="detail-card">
              <p ref={(el) => (detailRefs.current[3] = el)} data-target="100">0</p>
              <h5>SUPPORT</h5>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="about-it">
            <div className="aboutme">
              <div className="about-left-sec">
                <h4>-About Zenith Education</h4>
                <h6>Hello, nice to meet you!</h6>
                <h2>We help students of class 8 to 12 excel in their studies</h2>
                <p>At Zenith Education, we are dedicated to providing quality education to students from class 8 to 12. Our experienced teachers specialize in English, Mathematics, Science, Physics, Chemistry, and Commerce subjects. We aim to help students achieve their academic goals and become their best version.</p>
                <p>Our team of three dedicated teachers is committed to delivering personalized and effective teaching methods to ensure that each student understands and excels in their subjects. Join us at Zenith Education and take the first step towards academic success.</p>
                <img src="null" alt="signature" />
              </div>
              <div className="about-right-sec">
                <img src='/images/person_2.jpg' alt="" />
                <div className="experience">
                  <a href="">
                    <h1>24</h1>
                    <p>Years of Experience</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="result">
        <div className="container">
          <div className="containerthree">
            <h2>Our Toppers 🎓</h2>
            <div
              className="result-sec"
              style={{ transform: `translateX(-${offset}%)` }}
            >
              {toppers.length > 0 ? (
                toppers.map((item) => (
                  <div className="result-card" key={item._id}>
                    <img src={`http://localhost:5000${item.photo}`} alt={item.name} />
                    <h1>{item.name}</h1>
                    <p>{item.percentage}%</p>
                  </div>
                ))
              ) : (
                <p>No toppers yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="coaching-work">
            <h2>Why Zenith Education Works?</h2>
            <p>OUR SERVICES</p>
            <div className="coaching-work-sec">
              <div className="coach-left-sec">
                <div className="coach-sec-img animate__animated animate__fadeInLeft wow">
                  <img src='/images/person_3.jpg' alt="" />
                </div>
              </div>
              <div className="coach-right-sec">
                <div className="coach-detail">
                  <i className="fa fa-address-card animate__animated animate__fadeInDown wow" aria-hidden="true"></i>
                  <div className="coach-detail-content animate__animated animate__fadeInRight wow">
                    <h3>Personalized Attention</h3>
                    <p>We provide personalized attention to each student to ensure they understand and excel in their subjects.</p>
                  </div>
                </div>
                <div className="coach-detail">
                  <i className="fa fa-pie-chart animate__animated animate__fadeInDown wow" aria-hidden="true"></i>
                  <div className="coach-detail-content animate__animated animate__fadeInRight wow">
                    <h3>Experienced Teachers</h3>
                    <p>Our teachers have years of experience and are experts in their respective subjects.</p>
                  </div>
                </div>
                <div className="coach-detail">
                  <i className="fa fa-google-wallet animate__animated animate__fadeInDown wow" aria-hidden="true"></i>
                  <div className="coach-detail-content animate__animated animate__fadeInRight wow">
                    <h3>Comprehensive Curriculum</h3>
                    <p>We offer a comprehensive curriculum that covers all the essential topics and concepts.</p>
                  </div>
                </div>
                <div className="coach-detail">
                  <i className="fa fa-calendar-check-o animate__animated animate__fadeInDown wow" aria-hidden="true"></i>
                  <div className="coach-detail-content animate__animated animate__fadeInRight wow">
                    <h3>Flexible Scheduling</h3>
                    <p>We offer flexible scheduling options to accommodate the needs of our students.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="help-student">
        <div className="help-container">
          <div className="help-student">
            <p>We can help you in different situations</p>
            <h4>WE OFFER SERVICE</h4>
            <div className="situation">
              <div className="help-sec">
                <div className="help-card">
                  <i className="fa fa-signal" aria-hidden="true"><FaChalkboardTeacher /></i>
                  <h2>Career Guidance</h2>
                  <p>We provide career guidance to help students make informed decisions about their future.</p>
                </div>
                <div className="help-card">
                  <i className="fa fa-circle-o" aria-hidden="true"><SiTestcafe /></i>
                  <h2>Exam Preparation</h2>
                  <p>Our exam preparation courses help students perform their best in their exams.</p>
                </div>
                <div className="help-card">
                  <i className="fa fa-circle-o" aria-hidden="true"><MdSubject /></i>
                  <h2>Subject Tutoring</h2>
                  <p>We offer subject-specific tutoring to help students excel in their studies.</p>
                </div>
                <div className="help-card">
                  <i className="fa fa-circle-o" aria-hidden="true"><MdMapsHomeWork /></i>
                  <h2>Homework Help</h2>
                  <p>We provide homework help to ensure students complete their assignments on time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="container">
          <div className="subscribe">
            <div className="detail">
              <p>Subscribe for our weekly tips</p>
            </div>
            <div className="subs-btn">
              <input type="text" name="" placeholder="Enter Your Email" id="" /><a href="">Subscribe</a>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};