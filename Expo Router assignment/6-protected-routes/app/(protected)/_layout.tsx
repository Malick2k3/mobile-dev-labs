import { Stack } from 'expo-router';
import React from 'react';

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#e2e8f0',
        contentStyle: { backgroundColor: '#0b1220' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="reports" options={{ title: 'Reports' }} />
    </Stack>
  );
}
