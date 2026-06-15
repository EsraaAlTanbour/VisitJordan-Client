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
  const [bookingDate, setBookingDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);

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

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "User") {
      alert("Only users can book experiences");
      return;
    }

    if (!bookingDate) {
      alert("Please choose a booking date");
      return;
    }

    if (peopleCount < 1) {
      alert("People count must be at least 1");
      return;
    }

    try {
      await api.post("/bookings", {
        experience_id: Number(id),
        booking_date: bookingDate,
        people_count: Number(peopleCount),
      });

      alert("Booking created successfully");
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create booking");
    }
  };

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
    return <h2 className="details-loading">Loading...</h2>;
  }

  const totalPrice = Number(experience.price) * Number(peopleCount);

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
              <p><strong>Capacity:</strong> {experience.capacity}</p>
              <p><strong>Start Date:</strong> {experience.start_date?.slice(0, 10)}</p>
              <p><strong>End Date:</strong> {experience.end_date?.slice(0, 10)}</p>
              <p><strong>Location:</strong> {experience.location}</p>
            </div>
          </div>
        </div>

        <div className="booking-card">
          <div className="booking-price">
            <h2>JOD {experience.price}</h2>
            <p>per person</p>
          </div>

          <div className="booking-field">
            <label>Booking Date</label>
            <input
              type="date"
              value={bookingDate}
              min={experience.start_date?.slice(0, 10)}
              max={experience.end_date?.slice(0, 10)}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          <div className="booking-field">
            <label>Number of People</label>
            <input
              type="number"
              min="1"
              max={experience.capacity}
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
            />
          </div>

          <div className="booking-total">
            Total: <span>JOD {totalPrice}</span>
          </div>

          <button className="book-btn" onClick={handleBooking}>
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