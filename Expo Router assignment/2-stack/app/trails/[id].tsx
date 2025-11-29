import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const trailDetails: Record<string, { name: string; summary: string }> = {
  m1: { name: 'Mount Ember', summary: 'Lava rock switchbacks with a ridgeline view.' },
  f2: { name: 'Forest Run', summary: 'Shaded singletrack with river crossings.' },
  c3: { name: 'Canyon Ridge', summary: 'Technical scrambles and big canyon drops.' },
};

export default function TrailDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const navigation = useNavigation();
  const key = id ?? 'unknown';
  const detail = trailDetails[key] ?? { name: 'Unknown trail', summary: 'Not in the list yet.' };

  useEffect(() => {
    navigation.setOptions({ title: detail.name });
  }, [detail.name, navigation]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ presentation: 'card' }} />
      <Text style={styles.title}>{detail.name}</Text>
      <Text style={styles.body}>{detail.summary}</Text>
      <Text style={styles.caption}>Route id: {key}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 24, fontWeight: '800' },
  body: { color: '#cbd5e1', fontSize: 16, lineHeight: 22 },
  caption: { color: '#94a3b8' },
});
