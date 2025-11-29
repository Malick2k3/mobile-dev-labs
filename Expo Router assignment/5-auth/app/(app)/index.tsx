import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../_layout';

export default function AppHome() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user}</Text>
      <Text style={styles.body}>
        This is the protected area. The auth guard lives in the root layout and decides which
        segment to show.
      </Text>

      <Link href="/(app)/profile" style={styles.link}>
        View profile
      </Link>

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 14, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 28, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  link: { color: '#93c5fd', fontSize: 16 },
  button: { backgroundColor: '#ef4444', padding: 12, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
});
