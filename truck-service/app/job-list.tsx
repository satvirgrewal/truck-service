import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {Job} from '../models/job';
import { useJobs } from '@/context/jobs-context';

export default function JobListScreen() {
  const { jobs } = useJobs();
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
            <Text style={styles.plate}>License Plate: {item.licensePlate}</Text>
            <Text>Mileage: {item.mileage}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Time Spent: {item.timeSpent}</Text>
            <Text>
              Parts Used: {item.partsUsed.length > 0 ? item.partsUsed.join(', ') : 'None'}
            </Text>
            <Text>Date: {item.date.toLocaleString()}</Text>
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