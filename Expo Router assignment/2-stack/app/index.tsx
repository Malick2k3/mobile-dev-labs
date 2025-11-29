import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StackHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stack Navigator</Text>
      <Text style={styles.body}>
        Navigate with push/replace/back, pass params, and set titles from the screen component.
      </Text>

      <Link href="/trails" style={styles.inlineLink}>
        Open trails list
      </Link>

      <Pressable
        style={styles.button}
        onPress={() => router.push({ pathname: '/trails/[id]', params: { id: 'm1' } })}>
        <Text style={styles.buttonText}>Jump to Mount Ember (param push)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 30, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  inlineLink: { color: '#93c5fd', fontSize: 16 },
  button: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: { color: '#e2e8f0', fontWeight: '700', textAlign: 'center' },
});
