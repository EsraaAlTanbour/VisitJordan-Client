import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/visitjordan logo.png";
import "../../css/provider/ProviderSidebar.css";

const ProviderSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="provider-sidebar">
      <div className="provider-logo">
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
        className={activeTab === "experiences" ? "active" : ""}
        onClick={() => setActiveTab("experiences")}
      >
        My Experiences
      </button>

      <button
        className={activeTab === "add" ? "active" : ""}
        onClick={() => setActiveTab("add")}
      >
        Add Experience
      </button>

      <button
        className={`profile-btn ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        Profile
      </button>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default ProviderSidebar;