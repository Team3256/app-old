import { CalendarCheck, Clock, Gamepad2, Settings } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router/tabs';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';
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
            name="index"
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
