import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not found</Text>
      <Text style={styles.body}>This route does not exist. Head back to a known screen.</Text>
      <Link href="/" style={styles.link}>
        Go home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 26, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  link: { color: '#93c5fd', fontSize: 16 },
});
