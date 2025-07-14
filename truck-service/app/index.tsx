import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useState } from 'react';

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
];

export default function HomeScreen() {
  const [jobs] = useState(initialJobs);
  //  const navigation = useNavigation();

   // Filter jobs from last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentJobs = jobs.filter(job => job.date > sevenDaysAgo);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truck Service App</Text>
      <Link href="/job-form" asChild>
        <Button title="Create New Job" />
      </Link>
      <Text style={styles.subtitle}>Jobs (Last 7 Days)</Text>
      <FlatList
        data={recentJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.plate}>{item.licensePlate}</Text>
            <Text>{item.description}</Text>
            <Text>{item.date.toDateString()}</Text>
            <Link href={`/edit-job/${item.id}`} asChild>
              <Button title="Edit" />
            </Link>
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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
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