import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppSettingsProvider } from './src/context/AppSettingsContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppSettingsProvider>
        <AppNavigator />
      </AppSettingsProvider>
    </SafeAreaProvider>
  );
}
