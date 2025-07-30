import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import JobForm from '../components/job-form';

describe('JobForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders all form fields correctly', () => {
    const { getByPlaceholderText, getByText } = render(<JobForm onSubmit={mockSubmit} />);
    
    expect(getByPlaceholderText('ABC 1234')).toBeTruthy();
    expect(getByPlaceholderText('12345')).toBeTruthy();
    expect(getByPlaceholderText('Describe the job')).toBeTruthy();
    expect(getByPlaceholderText('e.g. 2 hours')).toBeTruthy();
    expect(getByPlaceholderText('Add part')).toBeTruthy();
    expect(getByText('Submit Job')).toBeTruthy();
  });

  it('pre-fills form fields when an existing job is provided', () => {
    const existingJob = {
      id: 'job1',
      licensePlate: 'EXISTING',
      mileage: '100000',
      description: 'Existing job description',
      timeSpent: '3 hours',
      partsUsed: ['oil filter', 'spark plugs'],
      date: new Date(),
    };

    const { getByDisplayValue, getByText } = render(<JobForm job={existingJob} onSubmit={mockSubmit} />);

    expect(getByDisplayValue(existingJob.licensePlate)).toBeTruthy();
    expect(getByDisplayValue(existingJob.mileage)).toBeTruthy();
    expect(getByDisplayValue(existingJob.description)).toBeTruthy();
    expect(getByDisplayValue(existingJob.timeSpent)).toBeTruthy();
    // Check that the parts are rendered in the list
    existingJob.partsUsed.forEach(part => {
      expect(getByText(`- ${part}`)).toBeTruthy();
    });
  });

  it('calls onSubmit with the correct data for a new job', async () => {
    const { getByPlaceholderText, getByText } = render(<JobForm onSubmit={mockSubmit} />);

    fireEvent.changeText(getByPlaceholderText('ABC 1234'), 'NEW-JOB');
    fireEvent.changeText(getByPlaceholderText('12345'), '50000');
    fireEvent.changeText(getByPlaceholderText('Describe the job'), 'New work done');
    fireEvent.changeText(getByPlaceholderText('e.g. 2 hours'), '1 hour');
    fireEvent.changeText(getByPlaceholderText('Add part'), 'air filter');
    fireEvent.press(getByText('Add Part'));

    fireEvent.press(getByText('Submit Job'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        licensePlate: 'NEW-JOB',
        mileage: '50000',
        description: 'New work done',
        timeSpent: '1 hour',
        partsUsed: ['air filter'],
      });
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onSubmit with updated data for an existing job', async () => {
    const existingJob = {
      id: 'job2',
      licensePlate: 'UPDATE-ME',
      mileage: '120000',
      description: 'Initial description',
      timeSpent: '2 hours',
      partsUsed: ['brake pads'],
      date: new Date(),
    };

    const { getByDisplayValue, getByText } = render(
      <JobForm job={existingJob} onSubmit={mockSubmit} />
    );

    fireEvent.changeText(getByDisplayValue('Initial description'), 'Updated description');
    fireEvent.press(getByText('Submit Job'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        licensePlate: 'UPDATE-ME',
        mileage: '120000',
        description: 'Updated description',
        timeSpent: '2 hours',
        partsUsed: ['brake pads'],
      });
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('shows a validation error if license plate is empty', async () => {
    const { getByText, queryByText } = render(<JobForm onSubmit={mockSubmit} />);
    
    fireEvent.press(getByText('Submit Job'));

    await waitFor(() => {
      expect(queryByText('License plate is required')).toBeTruthy();
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  it('shows a validation error if description is empty', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<JobForm onSubmit={mockSubmit} />);
    
    fireEvent.changeText(getByPlaceholderText('ABC 1234'), 'VALID-PLATE');
    fireEvent.press(getByText('Submit Job'));

    await waitFor(() => {
      expect(queryByText('Description is required')).toBeTruthy();
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });
});