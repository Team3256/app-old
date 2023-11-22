// import { HomeIcon, HomeScreen } from '@acme/feature-home';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'tamagui';
export default function App() {
  useEffect(() => {
    router.replace('/attendance'); // weird hack.
  }, []);

  return (
    <View style={styles.container}>
      <Text>You shouldn't be here.</Text>
      <Button>
        <Link
          replace
          href="/attendance"
          style={{
            color: 'white',
          }}
        >
          <Text>Attendance</Text>
        </Link>
      </Button>
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
