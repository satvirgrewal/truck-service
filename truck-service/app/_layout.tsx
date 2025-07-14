import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { JobsProvider } from '@/context/jobs-context';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

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
    <JobsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="job-form" options={{ title: 'New Job' }} />
        <Stack.Screen name="edit-job/[id]" options={{ title: 'Edit Job' }} />
      </Stack>
    </JobsProvider>
  );
}
