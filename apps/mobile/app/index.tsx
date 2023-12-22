// @ts-nocheck
// import { HomeIcon, HomeScreen } from '@acme/feature-home';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, Linking, Alert } from 'react-native';
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState('No PIN entered.');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <>
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
          <Button
            title={'Enter Override PIN'}
            onPress={() => {
              Alert.alert('Not implemented.', "This feature hasn't been implemented yet.");
            }}
          />

          <Text>{message}</Text>
        </View>
      </>
    );
  }
  if (hasPermission === false) {
    return (
      <>
        <View style={styles.container}>
          <Text>No access to camera</Text>
          <Button
            title={'Open Settings'}
            onPress={() => {
              // Launch settings for the app
              Linking.openSettings();
            }}
          />
          <Button title={'Try Again'} onPress={() => setHasPermission(null)} />
          <Button
            title={'Enter Override PIN'}
            onPress={() => {
              Alert.alert('Not implemented.', "This feature hasn't been implemented yet.");
            }}
          />
          <Text>{message}</Text>
        </View>
      </>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTimeout(() => {
      setScanned(false);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Text>Attendance!</Text>
      {/* <HomeIcon style={{ fontSize: 64 }} /> */}
      {/* <HomeScreen /> */}
      <View style={styles.qrCodeContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <Text>Has permission: {hasPermission.toString()}</Text>

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Centered QR code container, with a fixed size
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
});
