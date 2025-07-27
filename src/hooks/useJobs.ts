import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { Job } from "@/types";

const fetchJobs = async (): Promise<Job[]> => {
  const res = await api.get("/jobs");
  return res.data;
};

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
}
