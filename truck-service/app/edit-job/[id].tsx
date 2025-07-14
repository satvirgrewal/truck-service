import JobForm from '../../components/job-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useJobs } from '../../context/jobs-context';
import { Text } from 'react-native';

export default function EditJobScreen() {

    const { addJob } = useJobs();
      const router = useRouter();
  const { id } = useLocalSearchParams();
  const { jobs } = useJobs();
    const job = jobs.find(j => j.id === id);
    
    if (!job) {
    return (
      <Text style={{ padding: 20 }}>Job not found.</Text>
    );
  }

  return (
    <JobForm
      initialValues={job}
      onSubmit={values => {
        addJob(values);
            router.push('/');
      }}
    />
  );
}