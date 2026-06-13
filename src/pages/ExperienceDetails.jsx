import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../css/ExperienceDetails.css";

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExperience();
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "User") {
      alert("Only users can like experiences");
      return;
    }

    try {
      await api.post("/likes", {
        user_id: user.id,
        experience_id: Number(id),
      });

      alert("Added to wishlist");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add to wishlist");
    }
  };

  if (!experience) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="experience-details-page">
      <div className="experience-details-container">
        <div className="experience-left">
          <img
            src={experience.image_url}
            alt={experience.title}
            className="experience-main-image"
          />

          <div className="experience-info-card">
            <h1>{experience.title}</h1>

            <p className="experience-city">📍 {experience.city_name}</p>

            <p className="experience-description">
              {experience.description}
            </p>

            <div className="experience-meta">
              <p><strong>Duration:</strong> {experience.duration}</p>
              <p><strong>Category:</strong> {experience.category}</p>
              <p><strong>Group Size:</strong> {experience.max_people}</p>
              <p><strong>Location:</strong> {experience.location}</p>
            </div>
          </div>
        </div>

        <div className="booking-card">
          <h2>JOD {experience.price}</h2>
          <p>per person</p>

          <button className="book-btn">
            Book Now
          </button>

          <button
            className="wishlist-btn"
            onClick={handleAddToWishlist}
          >
            ♡ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;