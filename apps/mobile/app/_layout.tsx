import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { StatusBar } from 'expo-status-bar';
import { Tabs } from 'expo-router/tabs';
import { CalendarCheck, Clock, Gamepad2, Settings, User2 } from '@tamagui/lucide-icons';
export default function Page() {
  return (
    <>
      <TamaguiProvider config={config}>
        <StatusBar style="auto" />
        <Tabs screenOptions={{ headerShown: false }}>
          {/* <Tabs.Screen
            name="index"
            options={{
              href: null,
            }}
          /> */}
          <Tabs.Screen
            name="scouting"
            options={{
              title: 'Scouting',
              tabBarIcon: ({ color, size }) => <Gamepad2 size={size} color={color} />,
              tabBarInactiveTintColor: '#97a3b8',
              tabBarActiveTintColor: '#000000',
            }}
          />
          <Tabs.Screen
            name="attendance"
            options={{
              title: 'Attendance',
              tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
              tabBarInactiveTintColor: '#97a3b8',
              tabBarActiveTintColor: '#000000',
            }}
          />
          <Tabs.Screen
            name="schedule"
            options={{
              title: 'Schedule',
              tabBarIcon: ({ color, size }) => <CalendarCheck size={size} color={color} />,
              tabBarInactiveTintColor: '#97a3b8',
              tabBarActiveTintColor: '#000000',
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
              tabBarInactiveTintColor: '#97a3b8',
              tabBarActiveTintColor: '#000000',
            }}
          />
        </Tabs>
      </TamaguiProvider>
    </>
  );
}
