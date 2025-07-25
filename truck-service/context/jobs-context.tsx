import { Job } from '../models/job';
import React, { createContext, useContext, useState } from 'react';

type JobsContextType = {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'date'>) => void;
  updateJob?: (id: string, updated: Omit<Job, 'date'>) => void;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  function addJob(job: Omit<Job, 'id' | 'date'>) {
    setJobs(prev => [
      ...prev,
      {
        ...job,
        id: Math.random().toString(36).slice(2),
        date: new Date(),
      },
    ]);
  }

  function updateJob(id: string, updated: Omit<Job, 'date'>) {
    setJobs(prev =>
      prev.map(j => (j.id === id ? { ...j, ...updated } : j))
    );
  }

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}