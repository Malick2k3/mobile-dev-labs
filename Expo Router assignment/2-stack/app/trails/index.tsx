import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const trails = [
  { id: 'm1', name: 'Mount Ember', grade: 'Moderate', distance: '6.4 km' },
  { id: 'f2', name: 'Forest Run', grade: 'Easy', distance: '4.1 km' },
  { id: 'c3', name: 'Canyon Ridge', grade: 'Hard', distance: '9.3 km' },
];

export default function TrailList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a trail</Text>
      <FlatList
        data={trails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/trails/[id]', params: { id: item.id } }} asChild>
            <Pressable style={styles.row}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.muted}>
                {item.grade} • {item.distance}
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
