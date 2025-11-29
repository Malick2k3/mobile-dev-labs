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
      <Stack.Screen name="index" options={{ title: 'Modal Patterns' }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          title: 'Route Modal',
          headerStyle: { backgroundColor: '#0b1220' },
        }}
      />
    </Stack>
  );
}
