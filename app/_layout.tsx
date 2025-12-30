import { Providers } from '@/components/provider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loadStoredAuth = useAuthStore((s) => s.loadStoredAuth);
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  if (loading) return null;

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
          </>
        ) : (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
          </>
        )}
      </Stack>

      {/* These can stay outside the Stack */}
      <StatusBar style="auto" />
    </ThemeProvider>
    </Providers>
  );
}
