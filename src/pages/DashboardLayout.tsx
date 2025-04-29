import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="mx-7 my-6 w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
