import { useRouter } from 'expo-router';
import JobForm from '../components/job-form';
import { useJobs } from '@/context/jobs-context';

export default function JobFormScreen() {
    const { addJob } = useJobs();
  const router = useRouter();
    return (
        <JobForm
        onSubmit={values => {
            addJob(values);
            router.push('/'); // Navigate back to the job list after submission
        }}
        />
    );
}