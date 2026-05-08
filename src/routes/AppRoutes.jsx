import {  Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cities from "../pages/Cities";
import Experiences from "../pages/Experiences";
import Blogs from "../pages/Blogs";

import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

import Profile from "../pages/Profile";
import LikedExperiences from "../pages/LikedExperiences";

import Dashboard from "../pages/Admin/Dashboard";
import UsersManagement from "../pages/Admin/UsersManagement";
import ContentManagement from "../pages/Admin/ContentManagement";

import ProviderDashboard from "../pages/Provider/Dashboard";
import ExperiencesTable from "../pages/Provider/ExperiencesTable";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/blogs" element={<Blogs />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/liked-experiences" element={<LikedExperiences />} />

      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users-management" element={<UsersManagement />} />
      <Route path="/admin/content-management" element={<ContentManagement />} />

      <Route path="/provider/dashboard" element={<ProviderDashboard />} />
      <Route path="/provider/experiences-table" element={<ExperiencesTable />} />
    </Routes>
  );
};

export default AppRoutes;