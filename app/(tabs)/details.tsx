import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hidden Details</Text>
      <Text style={styles.body}>This screen is inside the tabs group but not shown in the tab bar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 8,
  },
  body: {
    color: '#c7c7c7',
    textAlign: 'center',
  },
});
