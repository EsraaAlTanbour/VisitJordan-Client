import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/admin/AdminTables.css";

const ExperiencesRequests = () => {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const res = await api.get("/experiences");

      const pendingExperiences = res.data.filter(
        (exp) => exp.status === "Pending"
      );

      setExperiences(pendingExperiences);
    } catch (error) {
      alert("Failed to load pending experiences");
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const approveExperience = async (id) => {
    await api.put(`/experiences/${id}/approve`);
    fetchExperiences();
  };

  const rejectExperience = async (id) => {
    await api.put(`/experiences/${id}/reject`);
    fetchExperiences();
  };

  return (
    <div className="admin-page">
      <h1>Experiences Requests</h1>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Experience</th>
              <th>Provider</th>
              <th>Category</th>
              <th>City</th>
              <th>Price</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {experiences.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-cell">
                  No pending experiences
                </td>
              </tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id}>
                  <td>
                    <div className="experience-cell">
                      {exp.image_url && (
                        <img
                          src={exp.image_url}
                          alt={exp.title}
                          className="table-img"
                        />
                      )}

                      <div>
                        <strong>{exp.title}</strong>
                        <br />
                        <span className="small-text">ID: EXP-{exp.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    {exp.provider_first_name} {exp.provider_last_name}
                  </td>

                  <td>{exp.category || "-"}</td>
                  <td>{exp.city_name || "-"}</td>
                  <td>{exp.price ? `${exp.price} JOD` : "-"}</td>

                  <td>
                    {exp.created_at
                      ? new Date(exp.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span className="status pending">Pending</span>
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => approveExperience(exp.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => rejectExperience(exp.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperiencesRequests;