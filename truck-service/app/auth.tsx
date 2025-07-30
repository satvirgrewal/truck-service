import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, signup, loading } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isRegistering) {
        await signup(email, password);
        Alert.alert('Success', 'Account created! You can now log in.');
        setIsRegistering(false); // Switch to login after successful registration
      } else {
        await login(email, password);
        router.replace('/'); // Redirect to home after successful login
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/supreme-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isRegistering ? 'Register' : 'Login'}
        onPress={handleAuth}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />}
      <Button
        title={isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        onPress={() => setIsRegistering(!isRegistering)}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  spinner: {
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});