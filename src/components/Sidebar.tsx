import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  showSidebar: boolean;
  onClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClick, showSidebar }) => {
  const { logout } = useAuth();

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen w-full flex-col justify-between bg-blue-300 px-5 py-6">
      <div className="z-10 flex flex-col gap-y-4">
        <h3 className="text-center font-medium">CATI Dashboard</h3>
        <div className="flex flex-col items-start gap-y-3">
          <Link
            to="/dashboard"
            className={`block w-full rounded-md px-2 py-1 hover:bg-blue-400 ${isActive("/dashboard") ? "bg-blue-400" : ""}`}
            onClick={onClick}
          >
            Pengguna
          </Link>
          <Link
            to="/dashboard/koleksi"
            className={`block w-full rounded-md px-2 py-1 hover:bg-blue-400 ${isActive("/dashboard/koleksi") ? "bg-blue-400" : ""}`}
            onClick={onClick}
          >
            Jenis Dokumen
          </Link>
          <Link
            to="/dashboard/file"
            className={`block w-full rounded-md px-2 py-1 hover:bg-blue-400 ${isActive("/dashboard/file") ? "bg-blue-400" : ""}`}
            onClick={onClick}
          >
            File
          </Link>
          <Link
            to="/dashboard/program"
            className={`block w-full rounded-md px-2 py-1 hover:bg-blue-400 ${isActive("/dashboard/program") ? "bg-blue-400" : ""}`}
            onClick={onClick}
          >
            Program
          </Link>
          <Link
            to="/dashboard/feedback"
            className={`block w-full rounded-md px-2 py-1 hover:bg-blue-400 ${isActive("/dashboard/feedback") ? "bg-blue-400" : ""}`}
            onClick={onClick}
          >
            Umpan Balik
          </Link>
          <Link
            to="/dashboard/history"
            className={`block w-full rounded-md px-2 py-1 hover:bg-blue-400 ${isActive("/dashboard/history") ? "bg-blue-400" : ""}`}
            onClick={onClick}
          >
            Riwayat
          </Link>
        </div>
      </div>
      <div>
        <button
          className="flex w-full cursor-pointer flex-row items-center justify-center gap-x-2 rounded-md p-2 hover:bg-blue-400"
          onClick={() => {
            logout();
            onClick();
          }}
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
      <div
        className="absolute inset-0 -z-50 bg-black opacity-50 sm:hidden"
        onClick={onClick}
      />
    </div>
  );
};

export default Sidebar;
