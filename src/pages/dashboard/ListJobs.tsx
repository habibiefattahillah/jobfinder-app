import { columns } from "@/components/job/columns";
import { DataTable } from "@/components/job/data-table";
import { useJobs } from "@/hooks/useJobs";

export default function JobListPage() {
  const { data: jobs = [], isLoading, isError } = useJobs();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Listings</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load jobs</p>
      ) : (
        <DataTable columns={columns} data={jobs} />
      )}
    </div>
  );
}
