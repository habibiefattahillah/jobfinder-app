export type JobStatus = 0 | 1;

export interface Job {
  _id: string;
  title: string;
  job_description: string;
  job_qualification: string;
  job_type: string;
  job_tenure: string;
  job_status: JobStatus;
  company_name: string;
  company_image_url: string;
  company_city: string;
  salary_min: number;
  salary_max: number;
}

export interface JobPayload extends Omit<Job, "_id"> {}

export interface User {
  name: string;
  image_url: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    name: string;
    email: string;
    image_url: string;
  };
  token: string;
}
