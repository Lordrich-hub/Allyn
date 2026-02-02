import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0B1220' },
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  )
}
