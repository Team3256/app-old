// import { HomeIcon, HomeScreen } from '@acme/feature-home';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Header } from 'tamagui';
import { API_URL } from '../constants';
import { useState } from 'react';
import type { TeamEventResponse } from '@acme/tba/team';

export default function App() {
  // Pull the events from the API
  // Display them in a list
  // Add a button to go to the scouting page for that event

  const [events, setEvents] = useState<TeamEventResponse[]>([]);

  if (events.length === 0) {
    fetch(API_URL + '/scouting/@me/getEvents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.events);
        setEvents(data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // if (events.length === 0 || typeof events[0] === 'undefined' || typeof events === 'undefined') {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //       <StatusBar style="auto" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scouting</Text>
      {events.map((event) => {
        return (
          <View key={event.key}>
            <Button
              onPress={() => {
                alert(
                  event.name + ' @ ' + event.city + ', ' + event.state_prov + ', ' + event.country
                );
              }}
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                {event.name}
              </Text>
            </Button>
          </View>
        );
      })}
      <StatusBar style="auto" />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
