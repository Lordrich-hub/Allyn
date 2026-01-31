import React from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'

export default function SearchScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Services</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search vendors..."
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Search coming soon with full vendor listings and filters</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    padding: 20,
    paddingTop: 0,
  },
  searchInput: {
    backgroundColor: '#1A1F35',
    borderWidth: 1,
    borderColor: '#2A3050',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
  },
})
