import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../css/MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my-bookings");
      setBookings(res.data);
    } catch (error) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "User") {
      navigate("/");
      return;
    }

    fetchBookings();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/bookings/${id}`);

      setBookings((prev) =>
        prev.filter((booking) => booking.id !== id)
      );

      alert("Booking cancelled successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to cancel booking"
      );
    }
  };

  if (loading) {
    return <h2>Loading bookings...</h2>;
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <img
                src={booking.image_url}
                alt={booking.experience_title}
              />

              <h3>{booking.experience_title}</h3>

              <p>
                <strong>Date:</strong>{" "}
                {booking.booking_date?.slice(0, 10)}
              </p>

              <p>
                <strong>People:</strong>{" "}
                {booking.people_count}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                JOD {booking.total_price}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {booking.status}
              </p>

              <button
                onClick={() => handleDelete(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;