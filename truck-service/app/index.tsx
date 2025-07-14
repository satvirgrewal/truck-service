import { View, Text, StyleSheet, Button } from 'react-native';
import { Link, useNavigation } from 'expo-router';

export default function HomeScreen() {
   const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truck Service App</Text>
      <Link href="/job-form" asChild>
        <Button title="Create New Job" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  }
});