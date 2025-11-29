import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const cities = [
  { slug: 'lagos', population: '15M', vibe: 'Afrobeat, beaches, tech' },
  { slug: 'nairobi', population: '5M', vibe: 'Culture, coffee, safaris' },
  { slug: 'cairo', population: '10M', vibe: 'Museums, markets, Nile' },
  { slug: 'capetown', population: '4M', vibe: 'Mountains, ocean, art' },
];

export default function CityIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All cities</Text>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <Link href={`/city/${item.slug}`} asChild>
            <Pressable style={styles.row}>
              <Text style={styles.rowTitle}>{item.slug.toUpperCase()}</Text>
              <Text style={styles.muted}>
                {item.population} • {item.vibe}
              </Text>
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 22, fontWeight: '800' },
  row: { paddingVertical: 10 },
  rowTitle: { color: '#c7d2fe', fontSize: 16, fontWeight: '700' },
  muted: { color: '#94a3b8' },
  separator: { height: 1, backgroundColor: '#1f2937' },
});
