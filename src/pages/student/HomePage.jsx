import React, { useEffect, useState } from "react";
import '../../styles/Navbar.css'; // Keep your existing CSS
import API from "../../utils/api";

export default function HomePage() {
  const [toppers, setToppers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3; // Number of cards visible at once

  // Fetch toppers from backend
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

  // Slide animation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= toppers.length - visibleCards) {
          return 0; // Reset to first set of cards
        }
        return prevIndex + 1;
      });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval);
  }, [toppers.length]);

  const offset = (currentIndex * 100) / visibleCards;

  return (
    <div>
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
    </div>
  );
}
