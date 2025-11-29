import { StyleSheet, Text, View } from 'react-native';

export default function Reports() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quarterly Reports</Text>
      <Text style={styles.body}>Sensitive metrics stay behind the gate.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 24, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
});
