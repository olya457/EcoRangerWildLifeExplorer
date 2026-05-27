import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {StorageProvider} from './src/storage/StorageProvider';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StorageProvider>
        <AppNavigator />
      </StorageProvider>
    </SafeAreaProvider>
  );
}

export default App;
