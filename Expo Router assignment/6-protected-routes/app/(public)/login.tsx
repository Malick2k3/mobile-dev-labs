import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGate } from '../_layout';

export default function Login() {
  const { grant } = useGate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request access</Text>
      <Text style={styles.body}>Tap continue to simulate verifying a token and opening the gate.</Text>
      <Pressable style={styles.button} onPress={grant}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 26, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  button: { backgroundColor: '#22d3ee', padding: 12, borderRadius: 12 },
  buttonText: { color: '#0f172a', fontWeight: '800', textAlign: 'center' },
});
