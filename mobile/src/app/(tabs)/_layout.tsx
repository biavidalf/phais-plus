import { theme } from '@/theme'
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  function profile() {
    return (
      <Link href="/profile" style={{ paddingHorizontal: 14 }}>
        <Feather name="user" size={24} color={theme.colors.neutral.sec} />
      </Link>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green.main,
        tabBarInactiveTintColor: theme.colors.neutral['200'],
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: theme.colors.bg.main,
          borderTopWidth: 2,
          borderTopColor: theme.colors.bg['layer-hover'],
        },
        headerTintColor: theme.colors.neutral.sec,
        headerTitleAlign: 'center',
        headerRight: profile,
        headerStyle: {
          backgroundColor: theme.colors.green.dark,
        },
        headerStatusBarHeight: 35,
        headerTitleStyle: { fontFamily: theme.fonts.family.medium },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="medicines/index"
        options={{
          title: 'Medicamentos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="stethoscope"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="requests/index"
        options={{
          title: 'Solicitações',
          tabBarIcon: ({ color }) => (
            <Feather name="inbox" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
