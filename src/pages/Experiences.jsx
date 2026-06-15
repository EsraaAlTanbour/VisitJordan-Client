import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../css/Experiences.css";
import PageHero from "../components/home/PageHero";
const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get("/experiences");

        const approvedExperiences = res.data.filter(
          (exp) => exp.status === "Approved"
        );

        setExperiences(approvedExperiences);
      } catch (error) {
        console.error(error);
        alert("Failed to load experiences");
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="experiences-page">
      <PageHero
  title="Experiences"
  subtitle="Book unique tours, food experiences, adventures, and cultural activities."
  image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5"
/>

      <div className="experiences-grid">
        {experiences.length === 0 ? (
          <p>No approved experiences yet.</p>
        ) : (
          experiences.map((exp) => (
            <Link
              to={`/experiences/${exp.id}`}
              className="experience-link"
              key={exp.id}
            >
              <div className="experience-card">
                <img
                  src={exp.image_url}
                  alt={exp.title}
                />

                <div className="experience-card-body">
                  <h3>{exp.title}</h3>

                  <p className="exp-location">
                    📍 {exp.city_name || "Jordan"}
                  </p>

                  <p className="exp-duration">
                    ⏱ {exp.duration || "Duration not specified"}
                  </p>

                  <div className="exp-bottom">
                    <span>⭐ 4.9</span>

                    <strong>
                      From JOD {exp.price}
                    </strong>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Experiences;