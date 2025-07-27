import axios from "axios";

export const getJobs = async (filters: {
  type?: string;
  location?: string;
  search?: string;
}) => {
  const params = new URLSearchParams();

  if (filters.type) params.append("type", filters.type);
  if (filters.location) params.append("location", filters.location);
  if (filters.search) params.append("search", filters.search);

  const res = await axios.get(`/api/jobs?${params.toString()}`);
  return res.data;
};
