import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import "../styles/ReviewStyles.css";

const CourseReviews = () => {
  const { courseId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/api/reviews/${courseId}`);
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/api/reviews/submit/${courseId}", { courseId, rating, comment });
      setRating(0);
      setComment("");
      fetchReviews(); 
    } catch (err) {
      console.error("Failed to submit review", err.response?.data || err);
      alert(err.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-reviews-container">
      <h2 className="review-title">Course Reviews</h2>
      <p className="average-rating">⭐ Average Rating: {averageRating}</p>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Rating (1–5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      
    </div>
  );
};

export default CourseReviews;
