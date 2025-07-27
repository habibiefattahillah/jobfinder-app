import { JobForm } from "@/components/forms/JobForm";
import { api } from "@/lib/axios";
import type { Job } from "@/types";
import { useNavigate } from "react-router-dom";

export default function JobCreatePage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Job) => {
    try {
      await api.post("/jobs", {
        title: data.title,
        job_description: data.job_description,
        job_qualification: data.job_qualification,
        job_type: data.job_type,
        job_tenure: data.job_tenure,
        job_status: data.job_status,
        company_name: data.company_name,
        company_image_url: data.company_image_url,
        company_city: data.company_city,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
      });
      navigate("/dashboard/list-job-vacancy");
    } catch (err) {
      console.error("Failed to create job:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Job</h2>
      <JobForm onSubmit={handleCreate} />
    </div>
  );
}
