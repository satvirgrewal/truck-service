import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { JobsProvider } from '@/context/jobs-context';
import { AuthProvider, useAuth } from '../context/auth-context';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const currentPath = segments.join('/');
      const isAuthScreen = currentPath === 'auth';

      if (user && isAuthScreen) {
        // If user is logged in and on the auth screen, redirect to home
        router.replace('/');
      } else if (!user && !isAuthScreen) {
        // If user is not logged in and not on the auth screen, redirect to auth
        router.replace('/auth');
      }
    }
  }, [user, loading, segments]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="job-form" options={{ title: 'New Job' }} />
      <Stack.Screen name="edit-job/[id]" options={{ title: 'Edit Job' }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <JobsProvider>
        <InitialLayout />
      </JobsProvider>
    </AuthProvider>
  );
}
