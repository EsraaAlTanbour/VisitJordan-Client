import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../css/Experiences.css";

const LikedExperiences = () => {
  const { user } = useAuth();
  const [likes, setLikes] = useState([]);

  const fetchLikes = async () => {
    try {
      const res = await api.get(`/likes/user/${user.id}`);
      setLikes(res.data);
    } catch (error) {
      alert("Failed to load liked experiences");
    }
  };

  useEffect(() => {
    if (user) fetchLikes();
  }, [user]);

  const removeLike = async (likeId) => {
    try {
      await api.delete(`/likes/${likeId}`);
      fetchLikes();
    } catch (error) {
      alert("Failed to remove like");
    }
  };

  if (!user) {
    return (
      <div className="experiences-page">
        <h1>Please login to view liked experiences</h1>
      </div>
    );
  }

  return (
    <div className="experiences-page">
      <h1>Liked Experiences</h1>

      <div className="experiences-grid">
        {likes.length === 0 ? (
          <p>No liked experiences yet.</p>
        ) : (
          likes.map((like) => (
            <div className="experience-card" key={like.id}>
              <img src={like.image_url} alt={like.title} />

              <div className="experience-card-body">
                <h3>{like.title}</h3>
                <p>{like.description}</p>
                <p>
                  <strong>Price:</strong> {like.price} JOD
                </p>

                <button
                  className="wishlist-btn"
                  onClick={() => removeLike(like.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikedExperiences;