import JobForm from '../components/job-form';

export default function JobFormScreen() {
  return (
    <JobForm
      onSubmit={values => {
        // handle create logic
        console.log('Create job:', values);
      }}
    />
  );
}