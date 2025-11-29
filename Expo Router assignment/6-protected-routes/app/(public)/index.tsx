import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function PublicLanding() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Public area</Text>
      <Text style={styles.body}>
        These routes stay accessible even when the gate is closed. Attempting to reach protected
        screens will redirect here.
      </Text>
      <Link href="/(public)/login" style={styles.link}>
        Request access
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
