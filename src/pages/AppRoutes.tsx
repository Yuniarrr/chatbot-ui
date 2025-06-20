import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "./DashboardLayout";
import DashboardUser from "./dashboard/User";
import DashboardFile from "./dashboard/File";
import DashboardHistory from "./dashboard/History";
import DashboardCollection from "./dashboard/Collection";
import DashboardProgram from "./dashboard/Program";
import DashboardFeedback from "./dashboard/Feedback";
import ConversationDetail from "./dashboard/History/ConversationDetail";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {user?.role === "ADMINISTRATOR" && (
            <>
              <Route index element={<DashboardUser />} />
              <Route path="file" element={<DashboardFile />} />
              <Route path="history" element={<DashboardHistory />} />
              <Route path="koleksi" element={<DashboardCollection />} />
              <Route path="program" element={<DashboardProgram />} />
              <Route path="feedback" element={<DashboardFeedback />} />
              <Route path="history/:id" element={<ConversationDetail />} />
            </>
          )}
          {user?.role === "USER" && (
            <Route path="program" element={<DashboardProgram />} />
          )}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
