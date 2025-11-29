import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.sheet}>
        <Text style={styles.title}>Route Modal</Text>
        <Text style={styles.body}>
          This modal is just another route, presented over the stack. Deep links here keep the
          underlying screen intact.
        </Text>
        <Link href="/" replace asChild>
          <Pressable style={styles.close}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(15,23,42,0.9)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  sheet: { backgroundColor: '#0b1220', padding: 20, borderRadius: 16, borderColor: '#1f2937', borderWidth: 1, gap: 12, width: '100%' },
  title: { color: '#e2e8f0', fontSize: 22, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  close: { backgroundColor: '#22c55e', paddingVertical: 12, borderRadius: 12 },
  closeText: { color: '#0f172a', fontWeight: '800', textAlign: 'center' },
});
