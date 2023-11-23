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
  };

  return (
    <View style={styles.container}>
      <Text>Attendance!</Text>
      <Image
        style={{
          width: 120,
          height: 120,
        }}
        source={{
          uri: 'https://i.imgur.com/7JX0ZSv.png',
        }}
      />
      {/* <HomeIcon style={{ fontSize: 64 }} /> */}
      {/* <HomeScreen /> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
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
});
