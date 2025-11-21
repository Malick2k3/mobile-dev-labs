import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, SafeAreaView, Pressable } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as LocalAuthentication from 'expo-local-authentication';

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

export default function DataScreen() {
    // Contacts
    const [contacts, setContacts] = useState([]);
    const [contactsStatus, setContactsStatus] = useState('Requesting access…');

    const fetchContacts = async () => {
        setContactsStatus('Requesting access…');
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
            setContactsStatus('Permission denied');
            setContacts([]);
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });
        setContacts(data || []);
        setContactsStatus(`Loaded ${data?.length || 0} contacts`);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Biometrics
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [biometricMessage, setBiometricMessage] = useState('Not authenticated');

    const handleBiometricAuth = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert('Error', 'Biometric hardware not available on this device');
            return;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert('Error', 'No biometrics are enrolled');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to continue',
            fallbackLabel: 'Use device passcode',
        });

        if (result.success) {
            setIsAuthenticated(true);
            setBiometricMessage('Authenticated');
            Alert.alert('Success', 'Authenticated successfully!');
        } else {
            setIsAuthenticated(false);
            setBiometricMessage('Failed or cancelled');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Security & Contacts</Text>
                <Text style={styles.caption}>Test biometrics and read device contacts securely.</Text>

                <View style={[styles.card, styles.cardAlt]}>
                    <Text style={styles.sectionTitle}>Biometrics</Text>
                    <Text style={styles.status}>{biometricMessage}</Text>
                    <ActionButton label={isAuthenticated ? 'Re-authenticate' : 'Authenticate'} onPress={handleBiometricAuth} />
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.sectionTitle}>Contacts</Text>
                        <Text style={styles.caption}>{contactsStatus}</Text>
                    </View>
                    {contacts.length === 0 ? (
                        <Text style={styles.caption}>No contacts found or permission denied.</Text>
                    ) : (
                        <FlatList
                            data={contacts}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => (
                                <View style={styles.contactItem}>
                                    <Text style={styles.contactName}>{item.name || 'Unnamed contact'}</Text>
                                    {item.phoneNumbers?.length ? (
                                        <Text style={styles.contactDetail}>{item.phoneNumbers[0].number}</Text>
                                    ) : (
                                        <Text style={styles.contactDetail}>No phone number</Text>
                                    )}
                                    {item.emails?.length ? <Text style={styles.contactDetail}>{item.emails[0].email}</Text> : null}
                                </View>
                            )}
                        />
                    )}
                    <ActionButton label="Refresh contacts" onPress={fetchContacts} tone="warm" />
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
        flex: 1,
    },
    cardAlt: {
        backgroundColor: palette.cardAlt,
        flex: 0,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        color: palette.text,
        fontSize: 18,
        fontWeight: '700',
    },
    status: {
        color: palette.text,
        fontWeight: '600',
    },
    contactItem: {
        paddingVertical: 8,
    },
    contactName: {
        color: palette.text,
        fontWeight: '700',
    },
    contactDetail: {
        color: palette.subtle,
    },
    separator: {
        height: 1,
        backgroundColor: palette.border,
        marginVertical: 6,
    },
    button: {
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
});
