import {  Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cities from "../pages/Cities";
import Experiences from "../pages/Experiences";
import Blogs from "../pages/Blogs";

import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

import Profile from "../pages/Profile";
import LikedExperiences from "../pages/LikedExperiences";

import ProviderDashboard from "../pages/Provider/Dashboard";
import ExperiencesTable from "../pages/Provider/ExperiencesTable";


import AdminLayout from "../components/admin/AdminLayout";
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

      <Route path="/provider/dashboard" element={<ProviderDashboard />} />
      <Route path="/provider/experiences-table" element={<ExperiencesTable />} />

      <Route path="/admin" element={<AdminLayout />} />
    </Routes>
  );
};

export default AppRoutes;