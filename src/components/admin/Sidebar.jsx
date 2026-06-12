import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/visitjordan logo.png";
import "../../css/admin/Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <img src={logo} alt="Visit Jordan Logo" />
        <h3>VisitJordan</h3>
      </div>

      <button
        className={activeTab === "dashboard" ? "active" : ""}
        onClick={() => setActiveTab("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={activeTab === "providers" ? "active" : ""}
        onClick={() => setActiveTab("providers")}
      >
        Providers Requests
      </button>

      <button
        className={activeTab === "experiences" ? "active" : ""}
        onClick={() => setActiveTab("experiences")}
      >
        Experiences Requests
      </button>

      <button
        className={activeTab === "content" ? "active" : ""}
        onClick={() => setActiveTab("content")}
      >
        Content Management
      </button>

      <button
        className={`profile-btn ${
          activeTab === "profile" ? "active" : ""
        }`}
        onClick={() => setActiveTab("profile")}
      >
        Profile
      </button>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;