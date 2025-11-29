import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.body}>
        Tabs remember their own history. Switch tabs and come back to pick up where you left off.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick actions</Text>
        <Link href="/(tabs)/discover" style={styles.link}>
          Jump to Discover
        </Link>
        <Link href="/(tabs)/profile" style={styles.link}>
          Open Profile
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 14, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 28, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  card: { backgroundColor: '#111827', padding: 14, borderRadius: 12, gap: 8, borderColor: '#1f2937', borderWidth: 1 },
  cardTitle: { color: '#e2e8f0', fontWeight: '700', fontSize: 16 },
  link: { color: '#93c5fd', fontSize: 15 },
});
