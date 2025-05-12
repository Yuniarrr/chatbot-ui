import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-full w-full flex-col sm:flex-row">
      {/* burger bar */}
      <div
        className={`w-full bg-blue-300 py-2 sm:hidden ${showSidebar ? "hidden" : "block"}`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="absolute top-2 left-2 size-7 cursor-pointer rounded-md p-1 hover:bg-blue-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <h3 className="text-center font-medium">CATI Dashboard</h3>
      </div>

      {/* sidebar */}
      <div
        className={`w-3/4 sm:w-1/6 ${showSidebar ? "block" : "hidden"} sm:block`}
      >
        <Sidebar onClick={() => setShowSidebar(!showSidebar)} showSidebar />
      </div>

      <div
        className={`mx-7 my-6 ${showSidebar ? "w-full sm:w-5/6" : ""} sm:w-5/6`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
