import { useAuthStore } from "@/stores/useAuthStore";
import { useJobs } from "@/hooks/useJobs";

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { data: jobs = [], isLoading, isError } = useJobs();

  const total = jobs.length;
  const active = jobs.filter((job) => job.job_status === 1).length;
  const pending = total - active;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Welcome back{user?.name ? `, ${user.name}` : ""}!
      </h2>

      {isLoading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load stats.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Jobs</h3>
            <p className="text-2xl">{total}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Active Jobs</h3>
            <p className="text-2xl">{active}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Pending Jobs</h3>
            <p className="text-2xl">{pending}</p>
          </div>
        </div>
      )}
    </div>
  );
}
