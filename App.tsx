import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppBootstrap from './src/components/AppBootstrap';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppBootstrap>
          <AppNavigator />
        </AppBootstrap>
      </SafeAreaProvider>
    </Provider>
  );
}
