import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardUser from "./pages/dashboard/User";
import DashboardFile from "./pages/dashboard/File";
import DashboardTool from "./pages/dashboard/Tool";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardHistory from "./pages/dashboard/History";
import ConversationDetail from "./pages/dashboard/History/ConversationDetail";
import DashboardCollection from "./pages/dashboard/Collection";
import DashboardProgram from "./pages/dashboard/Program";

function App() {
  return (
    <BrowserRouter>
      {/* <RoutesApp /> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardUser />} />
              <Route path="file" element={<DashboardFile />} />
              <Route path="tool" element={<DashboardTool />} />
              <Route path="history" element={<DashboardHistory />} />
              <Route path="koleksi" element={<DashboardCollection />} />
              <Route path="program" element={<DashboardProgram />} />
              <Route path="history/:id" element={<ConversationDetail />} />
            </Route>
          </Route>
        </Routes>
        {/* <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
