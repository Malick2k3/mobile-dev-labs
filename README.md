# Lab 10 Device Features (React Native + Expo)

Tabbed demo app showcasing biometrics, camera, accelerometer, GPS, contacts, Bluetooth LE scan, battery level, and vibration.

## Prereqs
- Node + npm
- WSL2 (Expo CLI does not support WSL1; switch the distro to WSL2 or run from macOS/Windows)
- Physical device for sensors/BT/biometrics

## Install and run
```bash
npm install
npx expo start          # use Expo Go for everything except Bluetooth
npx expo run:android    # or run:ios for a dev build to enable BLE
```
> If you see a peer dependency error, ensure `@config-plugins/react-native-ble-plx` is ^7.0.1 (works with Expo SDK 54).

## Permissions
- Android: camera, fine/coarse location, contacts, Bluetooth scan/connect, vibrate
- iOS InfoPlist: camera, location when in use, contacts, Bluetooth usage, Face ID

## Tabs
- Biometric: fingerprint/Face ID prompt
- Camera: live preview
- Accelerometer: live x/y/z values
- GPS: current coordinates
- Contacts: device contact names
- Bluetooth: BLE scan (requires dev build, not Expo Go)
- Battery: current level + vibrate button
