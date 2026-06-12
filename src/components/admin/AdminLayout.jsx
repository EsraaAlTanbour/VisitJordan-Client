import React, { useState } from "react";
import Sidebar from "./sidebar";
import AdminDashboard from "./AdminDashboard";
import ProvidersRequests from "./ProvidersRequests";
import ExperiencesRequests from "./ExperiencesRequests";
import ContentManagement from "./ContentManagement";
import AdminProfile from "./AdminProfile";

import "../../css/admin/AdminLayout.css";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="admin-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="admin-main">
  {activeTab === "dashboard" && <AdminDashboard />}
  {activeTab === "providers" && <ProvidersRequests />}
  {activeTab === "experiences" && <ExperiencesRequests />}
  {activeTab === "content" && <ContentManagement />}
  {activeTab === "profile" && <AdminProfile />}
  
</main>
    </div>
  );
};

export default AdminLayout;