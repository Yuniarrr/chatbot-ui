import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardUser from "./pages/dashboard/User";
import DashboardFile from "./pages/dashboard/File";
import DashboardTool from "./pages/dashboard/Tool";
import PrivateRoute from "./routes/PrivateRoute";

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
