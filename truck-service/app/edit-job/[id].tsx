import JobForm from '../../components/job-form';
import { useLocalSearchParams } from 'expo-router';

// You would fetch the job by id here
const job = {
  licensePlate: 'ABC123',
  mileage: '12000',
  description: 'Oil change',
  timeSpent: '1 hour',
  partsUsed: ['Oil filter', 'Engine oil'],
};

export default function EditJobScreen() {
  const { id } = useLocalSearchParams();

  return (
    <JobForm
      initialValues={job}
      onSubmit={values => {
        // handle update logic
        console.log('Edit job:', id, values);
      }}
    />
  );
}