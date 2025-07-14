import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';


const initialJobs = [
  {
    id: '1',
    licensePlate: 'ABC123',
    mileage: '12000',
    description: 'Oil change',
    timeSpent: '1 hour',
    partsUsed: ['Oil filter', 'Engine oil'],
    date: new Date(), // Today
  },
  {
    id: '2',
    licensePlate: 'XYZ789',
    mileage: '15000',
    description: 'Brake replacement',
    timeSpent: '2 hours',
    partsUsed: ['Brake pads'],
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: '3',
    licensePlate: 'LMN456',
    mileage: '18000',
    description: 'Tire rotation',
    timeSpent: '30 min',
    partsUsed: ['None'],
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago (should not show)
  },
];

export default function JobListScreen() {
  const [jobs] = useState(initialJobs);
  const router = useRouter();

  // Filter jobs from last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentJobs = jobs.filter(job => job.date > sevenDaysAgo);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs (Last 7 Days)</Text>
      <FlatList
        data={recentJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.plate}>{item.licensePlate}</Text>
            <Text>{item.description}</Text>
            <Text>{item.date.toDateString()}</Text>
            <Button
              title="Edit"
              onPress={() => router.push(`/edit-job/${item.id}`)}
            />
          </View>
        )}
        ListEmptyComponent={<Text>No jobs in the last 7 days.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  jobCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  plate: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
});