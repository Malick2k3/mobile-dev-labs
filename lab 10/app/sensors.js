import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable, Platform, Linking } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import * as Battery from 'expo-battery';

const palette = {
    background: '#0b1220',
    card: '#111a2c',
    cardAlt: '#0f1628',
    accent: '#22d3ee',
    accentWarm: '#f97316',
    text: '#e2e8f0',
    subtle: '#94a3b8',
    border: '#1f2a44',
};

const Button = ({ label, onPress, tone = 'accent' }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, styles[`button${tone}`], pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
);

const Badge = ({ label, tone = 'accent' }) => (
    <View style={[styles.badge, styles[`badge${tone}`]]}>
        <Text style={styles.badgeText}>{label}</Text>
    </View>
);

export default function SensorsScreen() {
    // Accelerometer
    const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
    const [accelSub, setAccelSub] = useState(null);

    const subscribeAccel = () => {
        setAccelSub(
            Accelerometer.addListener(incoming => {
                setAccelData(incoming);
            })
        );
    };

    const unsubscribeAccel = () => {
        accelSub && accelSub.remove();
        setAccelSub(null);
    };

    useEffect(() => {
        subscribeAccel();
        return () => unsubscribeAccel();
    }, []);

    // Location
    const [location, setLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState('Requesting GPS...');
    const fetchLocation = useCallback(async () => {
        setLocationStatus('Requesting GPS...');
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationStatus('Permission denied');
            setLocation(null);
            return;
        }

        const current = await Location.getCurrentPositionAsync({});
        setLocation(current);
        setLocationStatus('Live');
    }, []);

    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    // Battery
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [batteryState, setBatteryState] = useState(null);

    useEffect(() => {
        let levelSub;
        (async () => {
            const level = await Battery.getBatteryLevelAsync();
            setBatteryLevel(level);
            const state = await Battery.getPowerStateAsync();
            setBatteryState(state.batteryState);

            levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => setBatteryLevel(batteryLevel));
        })();

        return () => levelSub && levelSub.remove();
    }, []);

    // Bluetooth (opens system settings on native, Web Bluetooth if available)
    const [bluetoothStatus, setBluetoothStatus] = useState('Idle');
    const [bluetoothDevice, setBluetoothDevice] = useState(null);
    const [bluetoothError, setBluetoothError] = useState('');

    const isWebBluetoothAvailable = useMemo(() => typeof navigator !== 'undefined' && !!navigator.bluetooth, []);

    const openBluetooth = useCallback(async () => {
        setBluetoothError('');
        if (Platform.OS === 'web' && isWebBluetoothAvailable) {
            try {
                setBluetoothStatus('Scanning...');
                const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
                setBluetoothDevice({ name: device?.name || 'Unnamed device', id: device.id });
                setBluetoothStatus('Connected (Web BLE)');
            } catch (error) {
                setBluetoothStatus('Idle');
                setBluetoothError(error?.message || 'Bluetooth request cancelled');
            }
            return;
        }

        try {
            setBluetoothStatus('Opening settings…');
            await Linking.openURL('bluetooth:');
        } catch {
            await Linking.openSettings();
        } finally {
            setBluetoothStatus('Check your Bluetooth toggle, then return to the app');
        }
    }, [isWebBluetoothAvailable]);

    const formattedBattery = batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : '--';
    const batteryStateLabel = batteryState === Battery.BatteryState.CHARGING
        ? 'Charging'
        : batteryState === Battery.BatteryState.UNPLUGGED
            ? 'On battery'
            : batteryState === Battery.BatteryState.FULL
                ? 'Full'
                : 'Unknown';

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Device Sensors</Text>
                <Text style={styles.subtitle}>Live readings for motion, location, power, and Bluetooth.</Text>

                <View style={styles.cardRow}>
                    <View style={[styles.card, styles.cardHighlight]}>
                        <Text style={styles.cardLabel}>Accelerometer</Text>
                        <View style={styles.badgeRow}>
                            <Badge label={`x ${accelData.x.toFixed(2)}`} />
                            <Badge label={`y ${accelData.y.toFixed(2)}`} tone="warm" />
                            <Badge label={`z ${accelData.z.toFixed(2)}`} tone="accent" />
                        </View>
                        <Button label={accelSub ? 'Pause stream' : 'Resume stream'} onPress={accelSub ? unsubscribeAccel : subscribeAccel} />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Battery</Text>
                        <Text style={styles.metric}>{formattedBattery}</Text>
                        <Text style={styles.caption}>{batteryStateLabel}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardLabel}>GPS Location</Text>
                        <Badge label={locationStatus} tone="warm" />
                    </View>
                    {location ? (
                        <View style={styles.metricRow}>
                            <View>
                                <Text style={styles.metricLabel}>Latitude</Text>
                                <Text style={styles.metric}>{location.coords.latitude.toFixed(4)}</Text>
                            </View>
                            <View>
                                <Text style={styles.metricLabel}>Longitude</Text>
                                <Text style={styles.metric}>{location.coords.longitude.toFixed(4)}</Text>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.caption}>Waiting for position...</Text>
                    )}
                    <Button label="Refresh location" onPress={fetchLocation} />
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardLabel}>Bluetooth</Text>
                        <Badge label={bluetoothStatus} />
                    </View>
                    <Text style={styles.caption}>
                        {Platform.OS === 'web'
                            ? 'Use Web Bluetooth in supported browsers.'
                            : 'Open system settings to manage Bluetooth and pair devices.'}
                    </Text>
                    {bluetoothDevice && (
                        <View style={styles.deviceContainer}>
                            <Text style={styles.metricLabel}>Last device</Text>
                            <Text style={styles.metric}>{bluetoothDevice.name}</Text>
                            <Text style={styles.caption}>{bluetoothDevice.id}</Text>
                        </View>
                    )}
                    {bluetoothError ? <Text style={styles.error}>{bluetoothError}</Text> : null}
                    <Button label={Platform.OS === 'web' && isWebBluetoothAvailable ? 'Scan for device' : 'Open Bluetooth settings'} onPress={openBluetooth} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: palette.background,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        gap: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: palette.text,
    },
    subtitle: {
        color: palette.subtle,
        marginBottom: 4,
    },
    cardRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    card: {
        flex: 1,
        backgroundColor: palette.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: palette.border,
        gap: 12,
    },
    cardHighlight: {
        backgroundColor: palette.cardAlt,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardLabel: {
        color: palette.text,
        fontSize: 18,
        fontWeight: '700',
    },
    metric: {
        color: palette.text,
        fontSize: 22,
        fontWeight: '700',
    },
    metricLabel: {
        color: palette.subtle,
        marginBottom: 4,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    caption: {
        color: palette.subtle,
    },
    deviceContainer: {
        padding: 12,
        backgroundColor: palette.cardAlt,
        borderRadius: 12,
    },
    badge: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: palette.text,
        fontWeight: '600',
    },
    badgeaccent: {
        backgroundColor: '#1f9bb4',
    },
    badgewarm: {
        backgroundColor: '#9a3412',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 4,
    },
    buttonaccent: {
        backgroundColor: palette.accent,
    },
    buttonwarm: {
        backgroundColor: palette.accentWarm,
    },
    buttonPressed: {
        opacity: 0.9,
    },
    buttonText: {
        color: '#0b1220',
        fontWeight: '700',
        fontSize: 16,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    error: {
        color: '#fda4af',
    },
});
