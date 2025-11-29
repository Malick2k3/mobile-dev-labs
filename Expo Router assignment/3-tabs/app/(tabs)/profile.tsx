import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.body}>Local state stays when you tab away and come back.</Text>

      <Pressable
        style={[styles.toggle, notifications ? styles.on : styles.off]}
        onPress={() => setNotifications((n) => !n)}>
        <Text style={styles.toggleText}>
          Notifications: {notifications ? 'On' : 'Off'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 24, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  toggle: { padding: 12, borderRadius: 12 },
  on: { backgroundColor: '#15803d' },
  off: { backgroundColor: '#991b1b' },
  toggleText: { color: '#f8fafc', fontWeight: '700', textAlign: 'center' },
});
