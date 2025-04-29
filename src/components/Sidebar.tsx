import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("user") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full flex-col justify-between bg-blue-300 px-5 py-6">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-center font-medium">CATI Dashboard</h3>
        <div className="flex flex-col items-start gap-y-3">
          <Link
            to="/dashboard"
            className="block w-full rounded-md px-2 py-1 hover:bg-blue-400"
          >
            User
          </Link>
          <Link
            to="/dashboard/file"
            className="block w-full rounded-md px-2 py-1 hover:bg-blue-400"
          >
            File
          </Link>
          <Link
            to="/dashboard/tool"
            className="block w-full rounded-md px-2 py-1 hover:bg-blue-400"
          >
            Tool
          </Link>
        </div>
      </div>
      <div>
        <button
          className="flex w-full cursor-pointer flex-row items-center justify-center gap-x-2 rounded-md p-2 hover:bg-blue-500"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M14 4.75A2.75 2.75 0 0 0 11.25 2h-3A2.75 2.75 0 0 0 5.5 4.75v.5a.75.75 0 0 0 1.5 0v-.5c0-.69.56-1.25 1.25-1.25h3c.69 0 1.25.56 1.25 1.25v6.5c0 .69-.56 1.25-1.25 1.25h-3c-.69 0-1.25-.56-1.25-1.25v-.5a.75.75 0 0 0-1.5 0v.5A2.75 2.75 0 0 0 8.25 14h3A2.75 2.75 0 0 0 14 11.25v-6.5Zm-9.47.47a.75.75 0 0 0-1.06 0L1.22 7.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h7.19a.75.75 0 0 0 0-1.5H3.56l.97-.97a.75.75 0 0 0 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
