import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../_layout';

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('guest');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.body}>Type any name to simulate login.</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor="#475569"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={() => login(name || 'guest')}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: '#0b1220' },
  title: { color: '#e2e8f0', fontSize: 28, fontWeight: '800' },
  body: { color: '#cbd5e1', lineHeight: 22 },
  input: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: '#e2e8f0',
  },
  button: { backgroundColor: '#22c55e', padding: 12, borderRadius: 12 },
  buttonText: { color: '#0f172a', fontWeight: '800', textAlign: 'center' },
});
