import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../styles/StudentPages.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/api/users/profile`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [studentId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/users/profile`, profile);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <p className="profile-link">
        <a href="/student-dashboard">⬅ Go to Student Dashboard</a>
      </p>

      {profile && !editing && (
        <div className="profile-details">
          <div className="child-profile">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="btn"
          >
            Edit Profile
          </button>
          </div>
        </div>
      )}

      {profile && editing && (
        <form onSubmit={handleUpdate} className="student-profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Leave blank if unchanged"
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentProfile;
