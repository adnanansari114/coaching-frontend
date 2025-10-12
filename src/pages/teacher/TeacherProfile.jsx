import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../styles/TeacherPages.css";

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", bio: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const teacherId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/api/users/profile`);
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          bio: res.data.profile?.bio || "",
        });
      } catch (err) {
        console.error("Error fetching profile", err);
        alert("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/users/profile`, form);
      alert("Profile updated successfully!");
      setEditing(false);
      const res = await API.get(`/api/users/profile`);
      setProfile(res.data);
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Update failed!");
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const res = await API.put(`/api/users/${teacherId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile image updated!");
      setProfile((prev) => ({
        ...prev,
        profileImage: res.data.profileImage,
      }));
    } catch (err) {
      console.error("Image upload error", err);
      alert("Image upload failed");
    }
  };

  if (loading) {
    return <p className="loading-text">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <p className="error-message">
        Could not load profile. Please try again.
      </p>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">👨‍🏫 Teacher Profile</h1>
      <p className="dashboard-link">
        <a href="/teacher-dashboard">Go to Teacher Dashboard</a>
      </p>

      {/* Profile Image Section */}
      <div className="profile-image-section">
        <img
          src={profile.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-image"
        />
        <form onSubmit={handleImageUpload} className="image-upload-form">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" className="btn">
            Upload Image
          </button>
        </form>
      </div>

      {/* Profile Form or Display */}
      {editing ? (
        <form onSubmit={handleUpdate} className="profile-form">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={form.email} disabled />
          </div>
          <div>
            <label>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({
                  name: profile.name,
                  email: profile.email,
                  bio: profile.profile?.bio || "",
                });
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="child-display">
        <div className="profile-display">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
          {profile.profile?.bio && (
            <p>
              <strong>Bio:</strong> {profile.profile.bio}
            </p>
          )}
          <button onClick={() => setEditing(true)} className="btn">
            Edit Profile
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
