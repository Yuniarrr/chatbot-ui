import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import DashboardLayout from "./pages/DashboardLayout.tsx";
import DashboardUser from "./pages/dashboard/User.tsx";
import DashboardFile from "./pages/dashboard/File.tsx";
import DashboardTool from "./pages/dashboard/Tool.tsx";

const RoutesApp = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardUser />} />
      <Route path="file" element={<DashboardFile />} />
      <Route path="tool" element={<DashboardTool />} />
    </Route>
  </Routes>
);

export default RoutesApp;
