import React, { useState } from "react";
import ProviderSidebar from "./ProviderSidebar";
import ProviderDashboard from "./ProviderDashboard";
import MyExperiences from "./MyExperiences";
import AddExperience from "./AddExperience";
import ProviderProfile from "./ProviderProfile";
import "../../css/provider/ProviderLayout.css";

const ProviderLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="provider-layout">
      <ProviderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="provider-main">
        {activeTab === "dashboard" && <ProviderDashboard />}
        {activeTab === "experiences" && <MyExperiences />}
        {activeTab === "add" && <AddExperience />}
        {activeTab === "profile" && <ProviderProfile />}
      </main>
    </div>
  );
};

export default ProviderLayout;