import { Link } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ModalHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modals</Text>
      <Text style={styles.body}>
        Expo Router can present routes as modals. You can still use React Native&apos;s Alert or
        Modal components when you just need a quick overlay.
      </Text>

      <Pressable style={styles.button} onPress={() => Alert.alert('Heads up', 'This is an Alert.')}>
        <Text style={styles.buttonText}>Show Alert</Text>
      </Pressable>

      <Link href="/modal" asChild>
        <Pressable style={[styles.button, styles.secondary]}>
          <Text style={styles.buttonText}>Open route modal</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 30, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  button: { backgroundColor: '#1d4ed8', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  secondary: { backgroundColor: '#22c55e' },
  buttonText: { color: '#e2e8f0', fontWeight: '700', textAlign: 'center' },
});
