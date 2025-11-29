import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#e2e8f0',
        contentStyle: { backgroundColor: '#0b1220' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Trail Stack' }} />
      <Stack.Screen name="trails/index" options={{ title: 'All Trails' }} />
      <Stack.Screen name="trails/[id]" options={{ title: 'Trail Details' }} />
    </Stack>
  );
}
