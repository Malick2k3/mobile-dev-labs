import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Slot, useRouter, useRootNavigationState, useSegments } from 'expo-router';

type GateContextType = {
  allowed: boolean;
  grant: () => void;
  revoke: () => void;
  isLoaded: boolean;
};

const GateContext = createContext<GateContextType | null>(null);

function useGate() {
  const ctx = useContext(GateContext);
  if (!ctx) throw new Error('GateContext missing');
  return ctx;
}

function GateKeeper({ children }: { children: React.ReactNode }) {
  const { allowed, isLoaded } = useGate();
  const segments = useSegments();
  const router = useRouter();
  const navState = useRootNavigationState();

  useEffect(() => {
    if (!navState?.key || !isLoaded) return;
    const inPublic = segments[0] === '(public)';

    if (!allowed && !inPublic) {
      router.replace('/(public)/login');
    } else if (allowed && inPublic) {
      router.replace('/(protected)');
    }
  }, [allowed, isLoaded, navState?.key, router, segments]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b1220' }}>
        <ActivityIndicator color="#22d3ee" size="large" />
      </View>
    );
  }

  return children;
}

export default function RootLayout() {
  const [allowed, setAllowed] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const value = useMemo<GateContextType>(
    () => ({
      allowed,
      grant: () => setAllowed(true),
      revoke: () => setAllowed(false),
      isLoaded,
    }),
    [allowed, isLoaded],
  );

  return (
    <GateContext.Provider value={value}>
      <GateKeeper>
        <Slot />
      </GateKeeper>
    </GateContext.Provider>
  );
}

export { useGate };
