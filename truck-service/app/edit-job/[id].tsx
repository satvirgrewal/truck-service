import JobForm from '../../components/job-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useJobs } from '../../context/jobs-context';
import { Text } from 'react-native';

export default function EditJobScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { jobs, updateJob } = useJobs();

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return <Text style={{ padding: 20 }}>Job not found.</Text>;
  }

  return (
    <JobForm
      job={job}
      onSubmit={values => {
        if (updateJob) {
          updateJob(job.id, values);
        }
        router.push('/');
      }}
    />
  );
}