import React, { useState } from "react";
import ProviderSidebar from "./ProviderSidebar";
import ProviderDashboard from "./ProviderDashboard";
import MyExperiences from "./MyExperiences";
import AddExperience from "./AddExperience";
import ProviderProfile from "./ProviderProfile";
import EditExperience from "./EditExperience";
import "../../css/provider/ProviderLayout.css";
import Content from "../../components/home/Content";

const ProviderLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  return (
    <div className="provider-layout">
      <ProviderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="provider-main">
       {activeTab === "dashboard" && (
  <>
    <ProviderDashboard />
   
  </>
)}

        {activeTab === "experiences" && (
          <MyExperiences
            setActiveTab={setActiveTab}
            setEditingExperienceId={setEditingExperienceId}
          />
        )}
        {activeTab === "add" && <AddExperience />}
        {activeTab === "edit" && (
          <EditExperience
            experienceId={editingExperienceId}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "profile" && <ProviderProfile />}
      </main>
    </div>
  );
};

export default ProviderLayout;