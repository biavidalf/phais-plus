import React from "react";
import { Feather, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { theme } from "@/theme";

export default function TabLayout() {
  function profile() {
    return (
      <Link href="/profile" style={{ paddingHorizontal: 14 }}>
        <Feather name="user" size={24} color={theme.colors.neutral.sec} />
      </Link>
    );
  }
  return (
    <Tabs
      initialRouteName="requests"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green.main,
        tabBarInactiveTintColor: theme.colors.neutral["200"],
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.bg.main,
          height: 70,
          borderTopColor: theme.colors.bg["layer-hover"],
          borderTopWidth: 2,
        },
        headerTintColor: theme.colors.neutral.sec,
        headerTitleAlign: "center",
        headerRight: profile,
        headerStyle: {
          backgroundColor: theme.colors.green.dark,
        },
        headerStatusBarHeight: 35,
        headerTitleStyle: { fontFamily: theme.fonts.family.medium },
      }}
    >
      <Tabs.Screen
        name="meds"
        options={{
          title: "Medication",
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
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="requests"
        options={{
          title: "Solicitações",
          tabBarIcon: ({ color }) => (
            <Feather name="inbox" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
