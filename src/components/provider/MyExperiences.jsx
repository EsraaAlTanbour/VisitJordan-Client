import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/provider/ProviderTables.css";

const MyExperiences = ({ setActiveTab, setEditingExperienceId }) => {
  const [experiences, setExperiences] = useState([]);

  const fetchMyExperiences = async () => {
    try {
      const res = await api.get("/experiences/provider/my-experiences");
      setExperiences(res.data);
    } catch (error) {
      alert("Failed to load your experiences");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      await api.delete(`/experiences/${id}`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      alert("Experience deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete experience");
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
              <th>Capacity</th>
              <th>Booked</th>
              <th>Start</th>
              <th>End</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {experiences.length === 0 ? (
              <tr>
                <td colSpan="10" className="empty-cell">
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
                  <td>{exp.capacity || 0}</td>
                  <td>{exp.booked_count || 0}</td>
                  <td>{exp.start_date?.slice(0, 10) || "-"}</td>
                  <td>{exp.end_date?.slice(0, 10) || "-"}</td>
                  <td>{exp.price} JOD</td>

                  <td>
                    <span className={`status ${exp.status?.toLowerCase()}`}>
                      {exp.status}
                    </span>
                  </td>

                  <td>
                    {exp.status === "Pending" ? (
                      <>
                        <button
  className="edit-btn"
  onClick={() => {
    setEditingExperienceId(exp.id);
    setActiveTab("edit");
  }}
>
  Edit
</button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(exp.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span>Locked</span>
                    )}
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