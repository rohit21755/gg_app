import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SpinWheel from '@/components/SpinWheel';

export default function SpinWheelScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SpinWheel />
    </SafeAreaView>
  );
}
