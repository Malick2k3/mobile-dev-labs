import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Slot, useRootNavigationState, useRouter, useSegments } from 'expo-router';

type AuthContextType = {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
  isLoaded: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('AuthContext is not available');
  }
  return value;
}

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { user, isLoaded } = useAuth();

  useEffect(() => {
    if (!navigationState?.key || !isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(app)');
    }
  }, [user, segments, navigationState?.key, isLoaded, router]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b1220' }}>
        <ActivityIndicator color="#22c55e" size="large" />
      </View>
    );
  }

  return children;
}

export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      login: (name: string) => setUser(name),
      logout: () => setUser(null),
      isLoaded,
    }),
    [user, isLoaded],
  );

  return (
    <AuthContext.Provider value={value}>
      <ProtectedRoutes>
        <Slot />
      </ProtectedRoutes>
    </AuthContext.Provider>
  );
}

export { useAuth };
