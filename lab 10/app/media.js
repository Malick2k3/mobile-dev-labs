import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';

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

const ActionButton = ({ label, onPress, tone = 'accent' }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, styles[`button${tone}`], pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
);

export default function MediaScreen() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);

    const permissionView = useMemo(() => {
        if (!permission) return null;
        if (!permission.granted) {
            return (
                <View style={[styles.card, styles.permissionCard]}>
                    <Text style={styles.title}>Camera access needed</Text>
                    <Text style={styles.caption}>Allow the camera so you can capture and test haptics.</Text>
                    <ActionButton label="Grant permission" onPress={requestPermission} />
                </View>
            );
        }
        return null;
    }, [permission, requestPermission]);

    if (!permission || !permission.granted) {
        return <SafeAreaView style={styles.safe}>{permissionView}</SafeAreaView>;
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const capturePhoto = async () => {
        if (!cameraRef.current) return;
        const result = await cameraRef.current.takePictureAsync({ quality: 0.6 });
        setPhotoUri(result.uri);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const triggerVibration = (type) => {
        switch (type) {
            case 'light':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                break;
            case 'medium':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                break;
            case 'heavy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                break;
            case 'success':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Camera & Haptics</Text>
                <Text style={styles.caption}>Test the camera, capture a still, and play with vibration patterns.</Text>

                <View style={styles.card}>
                    <View style={styles.cameraShell}>
                        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
                        <View style={styles.cameraActions}>
                            <ActionButton label="Flip camera" onPress={toggleCameraFacing} />
                            <ActionButton label="Capture" onPress={capturePhoto} tone="warm" />
                        </View>
                    </View>
                    {photoUri ? (
                        <View style={styles.previewRow}>
                            <Image source={{ uri: photoUri }} style={styles.preview} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.metric}>Last capture</Text>
                                <Text style={styles.caption}>Stored locally on device for this session.</Text>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.caption}>No capture yet. Take a photo to preview.</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Haptics & vibration</Text>
                    <Text style={styles.caption}>Try different strengths and a success notification.</Text>
                    <View style={styles.hapticsRow}>
                        <ActionButton label="Light" onPress={() => triggerVibration('light')} />
                        <ActionButton label="Medium" onPress={() => triggerVibration('medium')} />
                        <ActionButton label="Heavy" onPress={() => triggerVibration('heavy')} tone="warm" />
                    </View>
                    <ActionButton label="Success notification" onPress={() => triggerVibration('success')} />
                </View>
            </View>
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
        padding: 20,
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: palette.text,
    },
    caption: {
        color: palette.subtle,
    },
    card: {
        backgroundColor: palette.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: palette.border,
        gap: 12,
    },
    permissionCard: {
        margin: 20,
    },
    sectionTitle: {
        color: palette.text,
        fontSize: 18,
        fontWeight: '700',
    },
    cameraShell: {
        backgroundColor: palette.cardAlt,
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: palette.border,
        gap: 12,
    },
    camera: {
        height: 320,
    },
    cameraActions: {
        flexDirection: 'row',
        gap: 10,
        padding: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
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
    previewRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    preview: {
        width: 96,
        height: 96,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: palette.border,
        backgroundColor: palette.cardAlt,
    },
    metric: {
        color: palette.text,
        fontWeight: '700',
        fontSize: 16,
    },
    hapticsRow: {
        flexDirection: 'row',
        gap: 10,
    },
});
