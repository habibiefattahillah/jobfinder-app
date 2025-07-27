// components/job/JobForm.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Job } from "@/types";

interface Props {
  initialValues?: Partial<Job>;
  onSubmit: (values: Job) => void;
}

export function JobForm({ initialValues = {}, onSubmit }: Props) {
  const [formData, setFormData] = useState<Job>({
    _id: initialValues._id || "",
    title: initialValues.title || "",
    job_description: initialValues.job_description || "",
    job_qualification: initialValues.job_qualification || "",
    job_type: initialValues.job_type || "",
    job_tenure: initialValues.job_tenure || "",
    job_status: initialValues.job_status ?? 1,
    company_name: initialValues.company_name || "",
    company_image_url: initialValues.company_image_url || "",
    company_city: initialValues.company_city || "",
    salary_min: initialValues.salary_min || 0,
    salary_max: initialValues.salary_max || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "salary_min" || name === "salary_max" || name === "job_status"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        ["title", "Title"],
        ["job_description", "Job Description"],
        ["job_qualification", "Job Qualification"],
        ["job_type", "Job Type"],
        ["job_tenure", "Job Tenure"],
        ["company_name", "Company Name"],
        ["company_image_url", "Company Image URL"],
        ["company_city", "Company City"],
      ].map(([name, label]) => (
        <div key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <div>
        <Label htmlFor="job_status">
          Job Status (1 = active, 0 = inactive)
        </Label>
        <Input
          id="job_status"
          name="job_status"
          type="number"
          value={formData.job_status}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="salary_min">Salary Min</Label>
        <Input
          id="salary_min"
          name="salary_min"
          type="number"
          value={formData.salary_min}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="salary_max">Salary Max</Label>
        <Input
          id="salary_max"
          name="salary_max"
          type="number"
          value={formData.salary_max}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
