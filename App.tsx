import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/index';
export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F9FbFc',
    flex: 1,
  }
})