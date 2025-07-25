import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { JobsProvider } from '../context/jobs-context';
import JobForm from '../components/job-form';

// Helper to render JobForm with context
function renderWithProvider(ui: React.ReactElement) {
  return render(<JobsProvider>{ui}</JobsProvider>);
}

describe('Job Creation', () => {
  it('renders all required fields', () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <JobForm onSubmit={jest.fn()} />
    );
    expect(getByPlaceholderText('ABC 1234')).toBeTruthy();
    expect(getByPlaceholderText('12345')).toBeTruthy();
    expect(getByPlaceholderText('Describe the job')).toBeTruthy();
    expect(getByPlaceholderText('e.g. 2 hours')).toBeTruthy();
    expect(getByPlaceholderText('Add part')).toBeTruthy();
    expect(getByText('Add Part')).toBeTruthy();
    expect(getByText('Submit Job')).toBeTruthy();
  });

  it('can add a job with all fields', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <JobForm onSubmit={onSubmit} />
    );
    fireEvent.changeText(getByPlaceholderText('ABC 1234'), 'TEST123');
    fireEvent.changeText(getByPlaceholderText('12345'), '99999');
    fireEvent.changeText(getByPlaceholderText('Describe the job'), 'Test job');
    fireEvent.changeText(getByPlaceholderText('e.g. 2 hours'), '3 hours');
    fireEvent.changeText(getByPlaceholderText('Add part'), 'Test Part');
    fireEvent.press(getByText('Add Part'));
    fireEvent.press(getByText('Submit Job'));
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

  // it('does not submit if required fields are missing', async () => {
  //   const onSubmit = jest.fn();
  //   const { getByText } = renderWithProvider(
  //     <JobForm onSubmit={onSubmit} />
  //   );
  //   fireEvent.press(getByText('Submit Job'));
  //   await waitFor(() => {
  //     expect(onSubmit).not.toHaveBeenCalled();
  //   });
  // });
});
