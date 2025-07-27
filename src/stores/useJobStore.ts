import { create } from "zustand";
import type { Job } from "@/types";

interface JobState {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (updated: Job) => void;
  deleteJob: (_id: string) => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJob: (updated) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job._id === updated._id ? updated : job)),
    })),
  deleteJob: (_id) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job._id !== _id),
    })),
}));
