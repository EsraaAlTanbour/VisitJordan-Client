import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/provider/ProviderDashboard.css";

const ProviderDashboard = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get("/experiences/provider/my-experiences");
        setExperiences(res.data);
      } catch (error) {
        alert("Failed to load dashboard");
      }
    };

    fetchExperiences();
  }, []);

  const totalExperiences = experiences.length;
  const approvedExperiences = experiences.filter(
    (exp) => exp.status === "Approved"
  ).length;
  const pendingExperiences = experiences.filter(
    (exp) => exp.status === "Pending"
  ).length;
  const totalBookings = experiences.reduce(
    (sum, exp) => sum + Number(exp.booked_count || 0),
    0
  );

  return (
    <div className="admin-page">
      <h1>Provider Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Experiences</h3>
          <p>{totalExperiences}</p>
        </div>

        <div className="dashboard-card">
          <h3>Approved Experiences</h3>
          <p>{approvedExperiences}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Experiences</h3>
          <p>{pendingExperiences}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Booked People</h3>
          <p>{totalBookings}</p>
        </div>
      </div>

      <div className="dashboard-table-card">
        <h2>My Experiences Overview</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Capacity</th>
              <th>Booked</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>

          <tbody>
            {experiences.length === 0 ? (
              <tr>
                <td colSpan="6">No experiences found</td>
              </tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.title}</td>
                  <td>{exp.capacity || 0}</td>
                  <td>{exp.booked_count || 0}</td>
                  <td>{exp.status}</td>
                  <td>{exp.start_date?.slice(0, 10) || "-"}</td>
                  <td>{exp.end_date?.slice(0, 10) || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderDashboard;