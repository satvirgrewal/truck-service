import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react-native';
import { JobsProvider } from '../context/jobs-context';
import HomeScreen from '../app/index'; // Adjust the import path as necessary
import JobForm from '../components/job-form';

// Mock expo-router to handle components like <Link> which require a router context.
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('JobsProvider', () => {
  it('provides jobs context', () => {
    const { getByText } = render(
      <JobsProvider>
        <HomeScreen />
      </JobsProvider>
    );
    expect(getByText('Truck Service App')).toBeTruthy();
  });

  it('adds job to context on submit', async () => {
    const onSubmit = jest.fn();
    render(
      <JobsProvider>
        <JobForm onSubmit={onSubmit} />
      </JobsProvider>
    );
    fireEvent.changeText(screen.getByPlaceholderText('ABC 1234'), 'TEST123');
    fireEvent.changeText(screen.getByPlaceholderText('12345'), '99999');
    fireEvent.changeText(screen.getByPlaceholderText('Describe the job'), 'Test job');
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 2 hours'), '3 hours');
    fireEvent.changeText(screen.getByPlaceholderText('Add part'), 'Test Part');
    fireEvent.press(screen.getByText('Add Part'));
    fireEvent.press(screen.getByText('Submit Job'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        licensePlate: 'TEST123',
        mileage: '99999',
        description: 'Test job',
        timeSpent: '3 hours',
        partsUsed: ['Test Part'],
      });
    });
  });
});