import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { store, AppDispatch } from './src/core/store/store';
import { AppNavigator } from './src/core/navigation/AppNavigator';
import { bootstrapAuth } from './src/features/auth/slices/authSlice';

const BootstrapAuthGate = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  return <AppNavigator />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar style="light" />
            <BootstrapAuthGate />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}