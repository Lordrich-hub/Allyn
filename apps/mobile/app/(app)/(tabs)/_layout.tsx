import React from 'react'
import { Tabs } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <View style={[styles.icon, { backgroundColor: color }]} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <View style={[styles.icon, { backgroundColor: color }]} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <View style={[styles.icon, { backgroundColor: color }]} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <View style={[styles.icon, { backgroundColor: color }]} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A1F35',
    borderTopColor: '#2A3050',
    borderTopWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
})
