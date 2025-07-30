import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import JobListScreen from '../app/job-list';
import { useJobs } from '../context/jobs-context';

// Mock the router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the useJobs hook
jest.mock('../context/jobs-context', () => ({
  useJobs: jest.fn(),
}));

describe('JobListScreen', () => {
  beforeEach(() => {
    mockPush.mockClear();
    (useJobs as jest.Mock).mockClear();
  });

  it('displays a list of recent jobs', () => {
    const today = new Date();
    const eightDaysAgo = new Date(today);
    eightDaysAgo.setDate(today.getDate() - 8);

    const recentJob = { id: 'job1', licensePlate: 'RECENT', description: 'Recent', date: new Date(), mileage: '100', timeSpent: '1hr', partsUsed: [] };
    const oldJob = { id: 'job2', licensePlate: 'OLD', description: 'Old', date: eightDaysAgo, mileage: '100', timeSpent: '1hr', partsUsed: [] };

    (useJobs as jest.Mock).mockReturnValue({ jobs: [recentJob, oldJob] });

    const { getByText, queryByText } = render(<JobListScreen />);

    expect(getByText('License Plate: RECENT')).toBeTruthy();
    expect(queryByText('License Plate: OLD')).toBeNull();
  });

  it('displays a message when there are no recent jobs', () => {
    (useJobs as jest.Mock).mockReturnValue({ jobs: [] });

    const { getByText } = render(<JobListScreen />);

    expect(getByText('No jobs in the last 7 days.')).toBeTruthy();
  });

  it('navigates to the edit page on "Edit" button press', () => {
    const recentJob = { id: 'job1', licensePlate: 'RECENT', description: 'Recent', date: new Date(), mileage: '100', timeSpent: '1hr', partsUsed: [] };
    (useJobs as jest.Mock).mockReturnValue({ jobs: [recentJob] });

    const { getByText } = render(<JobListScreen />);

    fireEvent.press(getByText('Edit'));

    expect(mockPush).toHaveBeenCalledWith('/edit-job/job1');
  });
});