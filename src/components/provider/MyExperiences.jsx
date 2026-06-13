import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "../../css/provider/ProviderTables.css";

const MyExperiences = () => {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);

  const fetchMyExperiences = async () => {
    try {
      const res = await api.get("/experiences");

      const myExperiences = res.data.filter(
        (exp) => exp.provider_id === user.id
      );

      setExperiences(myExperiences);
    } catch (error) {
      alert("Failed to load your experiences");
    }
  };

  useEffect(() => {
    fetchMyExperiences();
  }, []);

  return (
    <div className="admin-page">
      <h1>My Experiences</h1>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>City</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date Created</th>
            </tr>
          </thead>

          <tbody>
            {experiences.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-cell">
                  No experiences yet
                </td>
              </tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id}>
                  <td>
                    {exp.image_url ? (
                      <img
                        src={exp.image_url}
                        alt={exp.title}
                        className="table-img"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>{exp.title}</td>
                  <td>{exp.city_name || "-"}</td>
                  <td>{exp.category || "-"}</td>
                  <td>{exp.price} JOD</td>

                  <td>
                    <span className={`status ${exp.status?.toLowerCase()}`}>
                      {exp.status}
                    </span>
                  </td>

                  <td>
                    {exp.created_at
                      ? new Date(exp.created_at).toLocaleDateString()
                      : "-"}
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

export default MyExperiences;