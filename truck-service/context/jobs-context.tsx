import { createContext, useContext, useState } from 'react';

export type Job = {
  id: string;
  licensePlate: string;
  mileage: string;
  description: string;
  timeSpent: string;
  partsUsed: string[];
  date: Date;
};

type JobsContextType = {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'date'>) => void;
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

  return (
    <JobsContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}