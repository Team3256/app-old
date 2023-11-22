import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { StatusBar } from 'expo-status-bar';
import { Slot, Stack, Tabs } from 'expo-router';
export default function Page() {
  return (
    <>
      <TamaguiProvider config={config}>
        <SafeAreaView>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <Tabs screenOptions={{ headerShown: false }}>
              <Tabs.Screen
                name="scouting"
                options={{
                  title: 'Scouting',
                  tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>📋</Text>
                  ),
                  tabBarInactiveTintColor: '#97a3b8',
                  tabBarActiveTintColor: '#000000',
                }}
              />
              <Tabs.Screen
                name="attendance"
                options={{
                  title: 'Attendance',
                  tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>📋</Text>
                  ),
                  tabBarInactiveTintColor: '#97a3b8',
                  tabBarActiveTintColor: '#000000',
                }}
              />
              <Tabs.Screen
                name="schedule"
                options={{
                  title: 'Schedule',
                  tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>📋</Text>
                  ),
                  tabBarInactiveTintColor: '#97a3b8',
                  tabBarActiveTintColor: '#000000',
                }}
              />
              <Tabs.Screen
                name="settings"
                options={{
                  title: 'Settings',
                  tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>📋</Text>
                  ),
                  tabBarInactiveTintColor: '#97a3b8',
                  tabBarActiveTintColor: '#000000',
                }}
              />
            </Tabs>
          </SafeAreaProvider>
        </SafeAreaView>
      </TamaguiProvider>
    </>
  );
}
