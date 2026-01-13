import { Providers } from '@/components/provider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loadStoredAuth = useAuthStore((s) => s.loadStoredAuth);
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    // Wait for navigation to be ready
    if (!navigationState?.key) return;
    
    // Wait for segments to be available
    if (segments.length === 0) return;

    const inAuthGroup = segments[0] === '(tabs)';
    // Allowed authenticated routes outside of tabs
    const allowedAuthRoutes = ['profile', 'spin-wheel', 'submit-task', 'modal'];
    const isAllowedRoute = allowedAuthRoutes.includes(segments[0] || '');

    if (!user && inAuthGroup) {
      // Redirect to index if not authenticated but in auth group
      router.replace('/index');
    } else if (user && !inAuthGroup && !isAllowedRoute) {
      // Redirect to tabs if authenticated but not in auth group and not an allowed route
      router.replace('/(tabs)');
    }
  }, [user, loading, segments, router, navigationState]);

  if (loading || !navigationState?.key) {
    return null;
  }

  return (
    <Providers>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* ❗ ONLY Screens Inside Stack */}
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="profile" />
            <Stack.Screen name="spin-wheel" />
            <Stack.Screen name="submit-task" />
          </>
        ) : (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="register-step2" />
            <Stack.Screen name="register-step3" />
          </>
        )}
      </Stack>

      {/* These can stay outside the Stack */}
      <StatusBar style="auto" />
    </ThemeProvider>
    </Providers>
  );
}
