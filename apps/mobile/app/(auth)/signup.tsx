import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function SignUpScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'customer' | 'vendor'>('customer')

  const handleSignUp = async () => {
    // TODO: Integrate with Supabase auth
    router.replace('/(app)')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Join AfroLuxe</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        {/* User Type Selection */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, userType === 'customer' && styles.typeButtonActive]}
            onPress={() => setUserType('customer')}
          >
            <Text
              style={[styles.typeButtonText, userType === 'customer' && styles.typeButtonTextActive]}
            >
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, userType === 'vendor' && styles.typeButtonActive]}
            onPress={() => setUserType('vendor')}
          >
            <Text
              style={[styles.typeButtonText, userType === 'vendor' && styles.typeButtonTextActive]}
            >
              Vendor
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder={userType === 'vendor' ? 'Business Name' : 'Full Name'}
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.linkHighlight}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 32,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A3050',
    backgroundColor: '#1A1F35',
  },
  typeButtonActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: '#F59E0B',
  },
  typeButtonText: {
    textAlign: 'center',
    color: '#888888',
    fontWeight: 'bold',
  },
  typeButtonTextActive: {
    color: '#F59E0B',
  },
  input: {
    backgroundColor: '#1A1F35',
    borderWidth: 1,
    borderColor: '#2A3050',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0B1220',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#F59E0B',
    fontWeight: 'bold',
  },
})
