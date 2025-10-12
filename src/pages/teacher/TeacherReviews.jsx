import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../styles/ReviewStyles.css";

const TeacherReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const { data } = await API.get("/api/reviews/teacher/my-reviews");
      setReviews(data.reviews || []);
      setAverage(Number(data.averageRating) || 0); 
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err.response?.data?.message || "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };
  fetchReviews();
}, []);

  if (loading) {
    return <p className="loading-text">Loading reviews...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="teacher-reviews-container">
      <h2 className="review-title">My Course Reviews</h2>
      <p className="average-rating">
  ⭐ Average Rating: {Number(average).toFixed(1)} / 5
</p>

      {/* Review List */}
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="review-card">
              <p>
                <strong>Student:</strong> {rev.student?.name} (
                {rev.student?.email})
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {rev.rating}
              </p>
              {rev.course && (
                <p>
                  <strong>Course:</strong> {rev.course?.title}
                </p>
              )}
              <p className="review-comment">{rev.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherReviews;
