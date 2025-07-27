// routes/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Landing from "../pages/Landing";
import JobDetail from "../pages/JobDetail";
import NotFound from "../pages/NotFound";

// Dashboard Pages
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ListJobs from "../pages/dashboard/ListJobs";
import JobForm from "../pages/dashboard/AddJob";
import EditJob from "../pages/dashboard/EditJob";
import Profile from "../pages/dashboard/Profile";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/job-vacancy/:id" element={<JobDetail />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="list-job-vacancy" element={<ListJobs />} />
        <Route path="list-job-vacancy/form" element={<JobForm />} />
        <Route path="list-job-vacancy/edit/:id" element={<EditJob />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
