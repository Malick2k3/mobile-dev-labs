import { FlatList, StyleSheet, Text, View } from 'react-native';

const ideas = [
  { title: 'Sunrise hike', location: 'Ngong Hills', time: '6:30 AM' },
  { title: 'Art crawl', location: 'CBD galleries', time: '2:00 PM' },
  { title: 'Night market', location: 'Island shore', time: '8:00 PM' },
];

export default function Discover() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.body}>{item.location}</Text>
            <Text style={styles.muted}>{item.time}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 24, fontWeight: '800' },
  card: { padding: 14, borderRadius: 12, backgroundColor: '#111827', borderColor: '#1f2937', borderWidth: 1 },
  cardTitle: { color: '#c7d2fe', fontSize: 16, fontWeight: '700' },
  body: { color: '#cbd5e1' },
  muted: { color: '#94a3b8', marginTop: 4 },
  separator: { height: 12 },
});
