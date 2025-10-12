import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/ReviewStyles.css";

const StudentReviewForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/reviews/submit", {
        courseId,
        rating,
        comment,
      });

      setMessage(data.message);
      setRating(0);
      setComment("");

      setTimeout(() => {
        navigate(`/course-reviews/${courseId}`);
      }, 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="review-form-container">
      <h2 className="review-title">Leave a Review</h2>
      {message && <p className="review-message">{message}</p>}

      <form className="review-form" onSubmit={handleSubmit}>
        <label>Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label>Comment</label>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <button type="submit" className="review-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default StudentReviewForm;
