import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/admin/AdminTables.css";

const ProvidersRequests = () => {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const res = await api.get("/users/providers/pending");
      setProviders(res.data);
    } catch (error) {
      alert("Failed to load pending providers");
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const approveProvider = async (id) => {
    await api.put(`/users/providers/${id}/approve`);
    fetchProviders();
  };

  const rejectProvider = async (id) => {
    await api.delete(`/users/providers/${id}/reject`);
    fetchProviders();
  };

  return (
    <div className="admin-page">
      <h1>Providers Requests</h1>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Business Name</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-cell">
                  No pending providers
                </td>
              </tr>
            ) : (
              providers.map((provider) => (
                <tr key={provider.id}>
                  <td>
                    {provider.first_name} {provider.last_name}
                    <br />
                    <span className="small-text">ID: PRV-{provider.id}</span>
                  </td>

                  <td>{provider.business_name || "-"}</td>
                  <td>{provider.city || "-"}</td>
                  <td>{provider.email}</td>
                  <td>{provider.phone || "-"}</td>

                  <td>
                    {provider.created_at
                      ? new Date(provider.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span className="status pending">Pending</span>
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => approveProvider(provider.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => rejectProvider(provider.id)}
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

export default ProvidersRequests;