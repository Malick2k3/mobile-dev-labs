import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGate } from '../_layout';

export default function ProtectedHome() {
  const { revoke } = useGate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected dashboard</Text>
      <Text style={styles.body}>
        You can only reach this group if the gate is open. Deep links into protected screens are
        rerouted through the guard.
      </Text>
      <Link href="/(protected)/reports" style={styles.link}>
        View reports
      </Link>
      <Pressable style={styles.button} onPress={revoke}>
        <Text style={styles.buttonText}>Revoke access</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 26, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  link: { color: '#93c5fd', fontSize: 16 },
  button: { backgroundColor: '#ef4444', padding: 12, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
});
