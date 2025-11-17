import React, { useEffect, useState } from 'react';
import { Text, View, Button, FlatList, Vibration, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera, CameraView } from 'expo-camera';
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as Battery from 'expo-battery';
import { BleManager } from 'react-native-ble-plx';

const Tab = createBottomTabNavigator();
const ble = new BleManager();

const useAsync = (fn, deps = []) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

function Biometric() {
  const [status, setStatus] = useState('Not authenticated');
  const auth = async () => {
    const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Authenticate' });
    setStatus(result.success ? 'Authenticated' : 'Failed');
  };
  return (
    <View style={styles.center}>
      <Text>{status}</Text>
      <Button title="Authenticate" onPress={auth} />
    </View>
  );
}

function CameraTab() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [ready, setReady] = useState(false);
  useAsync(async () => {
    if (!permission?.granted) await requestPermission();
  }, [permission]);
  return (
    <View style={styles.fill}>
      {permission?.granted ? (
        <CameraView style={styles.fill} onCameraReady={() => setReady(true)} />
      ) : (
        <Button title="Request Camera" onPress={requestPermission} />
      )}
      {!ready && <Text style={styles.overlay}>Initializing…</Text>}
    </View>
  );
}

function AccelerometerTab() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    const sub = Accelerometer.addListener(setData);
    Accelerometer.setUpdateInterval(200);
    return () => sub.remove();
  }, []);
  return (
    <View style={styles.center}>
      <Text>{`x: ${data.x.toFixed(2)} y: ${data.y.toFixed(2)} z: ${data.z.toFixed(2)}`}</Text>
    </View>
  );
}

function GPSTab() {
  const [coords, setCoords] = useState();
  useAsync(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const pos = await Location.getCurrentPositionAsync({});
      setCoords(pos.coords);
    }
  }, []);
  return (
    <View style={styles.center}>
      <Text>
        {coords ? `Lat: ${coords.latitude.toFixed(4)} Lon: ${coords.longitude.toFixed(4)}` : 'Locating…'}
      </Text>
    </View>
  );
}

function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  useAsync(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.Name] });
      setContacts(data);
    }
  }, []);
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      ListEmptyComponent={<Text style={styles.center}>No contacts or permission denied</Text>}
    />
  );
}

function BluetoothTab() {
  const [devices, setDevices] = useState([]);
  useAsync(async () => {
    const state = await ble.state();
    if (state !== 'PoweredOn') return;
    const stateSub = ble.onStateChange((s) => s === 'PoweredOn' && ble.startDeviceScan(null, null, () => {}), true);
    ble.startDeviceScan(null, null, (error, device) => {
      if (device) {
        setDevices((prev) => {
          const seen = new Set(prev.map((d) => d.id));
          return seen.has(device.id) ? prev : [...prev, device];
        });
      }
    });
    return () => {
      ble.stopDeviceScan();
      stateSub.remove();
    };
  }, []);
  return (
    <FlatList
      data={devices}
      keyExtractor={(d) => d.id}
      renderItem={({ item }) => <Text style={styles.item}>{item.name || item.id}</Text>}
      ListEmptyComponent={<Text style={styles.center}>Scanning...</Text>}
    />
  );
}

function BatteryVibrationTab() {
  const [level, setLevel] = useState('?');
  useAsync(async () => {
    const l = await Battery.getBatteryLevelAsync();
    setLevel(`${Math.round(l * 100)}%`);
  }, []);
  return (
    <View style={styles.center}>
      <Text>Battery: {level}</Text>
      <Button title="Vibrate" onPress={() => Vibration.vibrate(500)} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Biometric" component={Biometric} />
        <Tab.Screen name="Camera" component={CameraTab} />
        <Tab.Screen name="Accelerometer" component={AccelerometerTab} />
        <Tab.Screen name="GPS" component={GPSTab} />
        <Tab.Screen name="Contacts" component={ContactsTab} />
        <Tab.Screen name="Bluetooth" component={BluetoothTab} />
        <Tab.Screen name="Battery" component={BatteryVibrationTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, textAlign: 'center' },
  fill: { flex: 1 },
  item: { padding: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  overlay: { position: 'absolute', bottom: 16, alignSelf: 'center' },
});
