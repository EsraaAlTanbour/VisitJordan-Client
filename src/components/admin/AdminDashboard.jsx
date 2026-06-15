import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/admin/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    experiences: 0,
    bookings: 0,
    cities: 0,
    destinations: 0,
    blogs: 0,
  });

  const [pendingProviders, setPendingProviders] = useState([]);
  const [pendingExperiences, setPendingExperiences] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await api.get("/users");
      const providersRes = await api.get("/users/providers/pending");
      const experiencesRes = await api.get("/experiences");
      const citiesRes = await api.get("/cities");
      const destinationsRes = await api.get("/destinations");
      const blogsRes = await api.get("/blogs");

      setStats({
        users: usersRes.data.length,
        providers: providersRes.data.length,
        experiences: experiencesRes.data.length,
        bookings: 0,
        cities: citiesRes.data.length,
        destinations: destinationsRes.data.length,
        blogs: blogsRes.data.length,
      });

      setPendingProviders(providersRes.data.slice(0, 5));

      const pending = experiencesRes.data.filter(
        (exp) => exp.status === "Pending" || exp.status === "pending"
      );

      setPendingExperiences(pending.slice(0, 5));
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Providers</h3>
          <p>{stats.providers}</p>
        </div>

        <div className="stat-card">
          <h3>Experiences</h3>
          <p>{stats.experiences}</p>
        </div>

        <div className="stat-card">
          <h3>Cities</h3>
          <p>{stats.cities}</p>
        </div>

        <div className="stat-card">
          <h3>Destinations</h3>
          <p>{stats.destinations}</p>
        </div>

        <div className="stat-card">
          <h3>Blogs</h3>
          <p>{stats.blogs}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-box">
          <h2>Recent Provider Requests</h2>

          {pendingProviders.length === 0 ? (
            <p>No pending provider requests.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {pendingProviders.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.name || provider.full_name}</td>
                    <td>{provider.email}</td>
                    <td>Pending</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dashboard-box">
          <h2>Recent Experience Requests</h2>

          {pendingExperiences.length === 0 ? (
            <p>No pending experience requests.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Experience</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {pendingExperiences.map((exp) => (
                  <tr key={exp.id}>
                    <td>{exp.title}</td>
                    <td>{exp.price} JD</td>
                    <td>{exp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;