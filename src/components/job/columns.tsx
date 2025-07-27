import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types";
import { Link } from "react-router-dom";
import { api } from "@/lib/axios";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "job_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<number>("job_status");
      return status === 1 ? "Active" : "Inactive";
    },
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "salary_min",
    header: "Salary Range",
    cell: ({ row }) => {
      const min = row.getValue<number>("salary_min");
      const max = row.original.salary_max;
      return `${min.toLocaleString()} - ${max.toLocaleString()}`;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <Link to={`/dashboard/list-job-vacancy/edit/${row.original._id}`}>
            Edit
          </Link>
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            if (confirm("Are you sure you want to delete this job?")) {
              api
                .delete(`/jobs/${row.original._id}`)
                .then(() => {
                  alert("Job deleted successfully");
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Failed to delete job:", error);
                  alert("Failed to delete job");
                });
            }
          }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
