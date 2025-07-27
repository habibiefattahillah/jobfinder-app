import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/axios";
import type { Job } from "@/types";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = res.data;
        setJob(job);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch job for editing:", err);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!job)
    return <div className="p-6 text-center text-red-600">Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Job Detail</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={job.company_image_url}
          alt={job.company_name}
          className="w-full md:w-60 h-60 object-cover rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-1">{job.company_name}</p>
          <p className="text-sm text-gray-500 mb-4">{job.company_city}</p>

          <p className="mb-2">
            <strong>Type:</strong> {job.job_type}
          </p>
          <p className="mb-2">
            <strong>Tenure:</strong> {job.job_tenure}
          </p>
          <p className="mb-2">
            <strong>Status:</strong>{" "}
            <span
              className={
                job.job_status === 1 ? "text-green-600" : "text-red-600"
              }
            >
              {job.job_status === 1 ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Salary:</strong> Rp {job.salary_min.toLocaleString()} - Rp{" "}
            {job.salary_max.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Job Description</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-line">
            {job.job_description}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Qualifications</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-line">
            {job.job_qualification}
          </p>
        </div>
      </div>
    </div>
  );
}
