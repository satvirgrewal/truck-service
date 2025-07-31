import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuth } from './auth-context';
import { Job } from '../models/job';

type JobsContextType = {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'date' | 'mechanicId'>) => Promise<void>;
  updateJob: (id: string, updated: Omit<Job, 'date' | 'mechanicId'>) => Promise<void>;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setJobs([]);
      return;
    }

    const jobsCollectionRef = collection(db, 'jobs');
    const q = query(
      jobsCollectionRef,
      where('mechanicId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedJobs: Job[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(), // Convert Firestore Timestamp to Date object
      })) as Job[];
      setJobs(fetchedJobs);
    });

    return unsubscribe;
  }, [user]);

  const addJob = async (job: Omit<Job, 'id' | 'date' | 'mechanicId'>) => {
    if (!user) throw new Error('User not authenticated');
    await addDoc(collection(db, 'jobs'), {
      ...job,
      mechanicId: user.uid,
      date: Timestamp.now(),
    });
  };

  const updateJob = async (id: string, updated: Omit<Job, 'date' | 'mechanicId'>) => {
    if (!user) throw new Error('User not authenticated');
    const jobRef = doc(db, 'jobs', id);
    await updateDoc(jobRef, { ...updated });
  };

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