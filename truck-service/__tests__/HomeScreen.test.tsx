import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../app/index';
import { JobsProvider, useJobs } from '../context/jobs-context';

// Mock the router
const mockPush = jest.fn();

jest.mock('expo-router', () => {
  const React = require('react');
  const { Pressable } = require('react-native');
  return {
    useRouter: () => ({ push: mockPush }),
    Link: ({ href, children, asChild }) => {
      if (asChild) {
        const child = React.Children.only(children);
        return React.cloneElement(child, { ...child.props, onPress: () => mockPush(href) });
      }
      return <Pressable onPress={() => mockPush(href)}>{children}</Pressable>;
    },
  };
});

// Mock the useJobs hook
jest.mock('../context/jobs-context', () => ({
  JobsProvider: jest.requireActual('../context/jobs-context').JobsProvider,
  useJobs: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    mockPush.mockClear();
    (useJobs as jest.Mock).mockClear();
  });

  it('renders the basic layout, title, and create button', () => {
    (useJobs as jest.Mock).mockReturnValue({ jobs: [] });
    const { getByText } = render(<JobsProvider><HomeScreen /></JobsProvider>);
    expect(getByText('Truck Service App')).toBeTruthy();
    expect(getByText('Jobs (Last 7 Days)')).toBeTruthy();
    expect(getByText('Create New Job')).toBeTruthy();
  });

  it('displays a message when there are no recent jobs', () => {
    (useJobs as jest.Mock).mockReturnValue({ jobs: [] });
    const { getByText } = render(<JobsProvider><HomeScreen /></JobsProvider>);
    expect(getByText('No jobs in the last 7 days.')).toBeTruthy();
  });

  it('displays only jobs from the last 7 days', () => {
    const today = new Date();
    const eightDaysAgo = new Date(today);
    eightDaysAgo.setDate(today.getDate() - 8);

    const recentJob = { id: 'job1', licensePlate: 'RECENT', description: 'Recent', date: new Date() };
    const oldJob = { id: 'job2', licensePlate: 'OLD', description: 'Old', date: eightDaysAgo };

    (useJobs as jest.Mock).mockReturnValue({ jobs: [recentJob, oldJob] });

    const { getByText, queryByText } = render(<JobsProvider><HomeScreen /></JobsProvider>);

    expect(getByText(recentJob.licensePlate)).toBeTruthy();
    expect(queryByText(oldJob.licensePlate)).toBeNull();
  });

  it('navigates to job form on "Create New Job" button press', () => {
    (useJobs as jest.Mock).mockReturnValue({ jobs: [] });
    const { getByText } = render(<JobsProvider><HomeScreen /></JobsProvider>);
    fireEvent.press(getByText('Create New Job'));
    expect(mockPush).toHaveBeenCalledWith('/job-form');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('navigates to the edit page on "Edit" button press for a job', () => {
    const recentJob = { id: 'job123', licensePlate: 'TEST-PLATE', description: 'A test job', date: new Date() };
    (useJobs as jest.Mock).mockReturnValue({ jobs: [recentJob] });
    const { getByText } = render(<JobsProvider><HomeScreen /></JobsProvider>);
    expect(getByText(recentJob.licensePlate)).toBeTruthy();
    fireEvent.press(getByText('Edit'));
    expect(mockPush).toHaveBeenCalledWith('/edit-job/job123');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});