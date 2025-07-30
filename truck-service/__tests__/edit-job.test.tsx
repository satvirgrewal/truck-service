import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditJobScreen from '../app/edit-job/[id]';
import { useJobs } from '../context/jobs-context';

// Mock the router and local search params
const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useLocalSearchParams: jest.fn(),
}));

// Mock the useJobs hook
jest.mock('../context/jobs-context', () => ({
  useJobs: jest.fn(),
}));

describe('EditJobScreen', () => {
  const mockUpdateJob = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
    mockUpdateJob.mockClear();
    (useJobs as jest.Mock).mockClear();
    (require('expo-router').useLocalSearchParams as jest.Mock).mockClear();
  });

  it('renders the job form with the correct job data', () => {
    const job = { id: 'job1', licensePlate: 'EDIT-ME', description: 'Test Desc' };
    (require('expo-router').useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'job1' });
    (useJobs as jest.Mock).mockReturnValue({ jobs: [job], updateJob: mockUpdateJob });

    const { getByDisplayValue } = render(<EditJobScreen />);

    expect(getByDisplayValue('EDIT-ME')).toBeTruthy();
    expect(getByDisplayValue('Test Desc')).toBeTruthy();
  });

  it('calls updateJob and redirects on form submission', async () => {
    const job = { id: 'job1', licensePlate: 'EDIT-ME', description: 'Test Desc' };
    (require('expo-router').useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'job1' });
    (useJobs as jest.Mock).mockReturnValue({ jobs: [job], updateJob: mockUpdateJob });

    const { getByText, getByDisplayValue } = render(<EditJobScreen />);

    fireEvent.changeText(getByDisplayValue('Test Desc'), 'Updated Description');
    fireEvent.press(getByText('Submit Job'));

    await waitFor(() => {
      expect(mockUpdateJob).toHaveBeenCalledWith('job1', {
        licensePlate: 'EDIT-ME',
        description: 'Updated Description',
        mileage: '',
        partsUsed: [],
        timeSpent: '',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays a "Job not found" message for an invalid job ID', () => {
    (require('expo-router').useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'invalid-id' });
    (useJobs as jest.Mock).mockReturnValue({ jobs: [], updateJob: mockUpdateJob });

    const { getByText } = render(<EditJobScreen />);

    expect(getByText('Job not found.')).toBeTruthy();
  });
});