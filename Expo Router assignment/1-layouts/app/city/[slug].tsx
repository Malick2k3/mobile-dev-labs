import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const notes: Record<string, string> = {
  lagos: 'Markets, Afrobeat, tech hubs, and Atlantic sunsets.',
  nairobi: 'Coffee culture, safaris a drive away, vibrant art.',
  cairo: 'Nile walks, bazaars, museums, layered history.',
  capetown: 'Table Mountain, beaches, design and food scene.',
};

export default function CityDetail() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const key = slug?.toLowerCase() ?? 'unknown';
  const description = notes[key] ?? 'This city is not in the featured list yet.';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{key.toUpperCase()}</Text>
      <Text style={styles.body}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 26, fontWeight: '800' },
  body: { color: '#cbd5e1', fontSize: 16, lineHeight: 22 },
});
