import { Timestamp } from 'firebase/firestore';

export type Job = {
  id: string;
  licensePlate: string;
  mileage: string;
  description: string;
  timeSpent: string;
  partsUsed: string[];
  date: Date | Timestamp;
  mechanicId: string;
};