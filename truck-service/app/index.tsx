import { Image, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useJobs } from '@/context/jobs-context';
import { useAuth } from '../context/auth-context';


export default function HomeScreen() {
  const { jobs } = useJobs();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show an alert to the user
    }
  };

   // Filter jobs from last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentJobs = jobs.filter(job => job.date > sevenDaysAgo);


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/supreme-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Truck Service App</Text>
        <Button title="Logout" onPress={handleLogout} style={styles.logoutButton} />
      </View>
      <Button title="Create New Job" onPress={() => router.push('/job-form')} />
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
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
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
  logoutButton: {
    // Position the button to the right within the header
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    position: 'relative', // Needed for absolute positioning of logout button
  },
  logo: {
    width: 80, // Smaller logo for header
    height: 80,
    marginRight: 10,
  },
  title: {
    fontSize: 20, // Smaller title for header
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Allow title to take available space
  },
});