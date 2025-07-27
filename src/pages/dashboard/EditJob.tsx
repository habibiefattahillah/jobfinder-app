// pages/dashboard/EditJob.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/forms/JobForm";
import type { Job } from "@/types";
import { api } from "@/lib/axios";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<Job>>({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = res.data;
        setInitialValues(job);
      } catch (err) {
        console.error("Failed to fetch job for editing:", err);
      }
    };

    fetchJob();
  }, [id]);

  const handleEditJob = async (values: Job) => {
    try {
      await api.put(`/jobs/${id}`, values);
      navigate("/dashboard/job-list");
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edit Job</h2>
      {initialValues.title ? (
        <JobForm onSubmit={handleEditJob} initialValues={initialValues} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
