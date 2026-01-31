import React from 'react'
import { Stack } from 'expo-router'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0B1220' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
