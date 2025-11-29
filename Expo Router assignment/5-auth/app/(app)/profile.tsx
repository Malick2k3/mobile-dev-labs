import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../_layout';

export default function Profile() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.body}>Signed in as: {user}</Text>
      <Text style={styles.muted}>This route is protected by the root layout guard.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 24, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  muted: { color: '#94a3b8' },
});
