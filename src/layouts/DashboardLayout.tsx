import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const { logout, user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(true);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block w-full px-4 py-2 rounded-md transition-colors duration-200",
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-gray-200",
    ].join(" ");

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="md:hidden"
          >
            {collapsed ? <Menu /> : <X />}
          </button>
          <h1 className="text-xl font-bold">Job Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "hidden md:block" : ""
          } min-w-screen md:min-w-64 bg-gray-100 p-4 border-r space-y-2 transition-all duration-300`}
        >
          <nav className="space-y-2">
            <NavLink to="/dashboard/list-job-vacancy" end className={linkClass}>
              Job Table
            </NavLink>
            <NavLink
              to="/dashboard/list-job-vacancy/form"
              className={linkClass}
            >
              Add Job
            </NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>
              Profile
            </NavLink>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 bg-white p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-3 text-sm border-t">
        Achmad Habibie Fattahillah - Sanbercode ReactJS Batch 68
      </footer>
    </div>
  );
}
