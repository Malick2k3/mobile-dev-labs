import { Stack } from 'expo-router';
import React from 'react';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#e2e8f0',
        contentStyle: { backgroundColor: '#0b1220' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Public' }} />
      <Stack.Screen name="login" options={{ title: 'Request Access' }} />
    </Stack>
  );
}
