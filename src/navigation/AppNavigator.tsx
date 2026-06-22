import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConfiguracionScreen from '../screens/configuracion/ConfiguracionScreen';
import CuentasDetalleScreen from '../screens/cuentas/CuentasDetalleScreen';
import NuevaCuentaScreen from '../screens/cuentas/NuevaCuentaScreen';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/registro/RegisterScreenCuenta';
import RegistrarMovimientoScreen from '../screens/registro/RegistrarMovimientoScreen';
import { RootStackParamList } from '../types/navigation';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
        <Stack.Screen name="RegistroMovimiento" component={RegistrarMovimientoScreen} />
        <Stack.Screen name="CuentasDetalle" component={CuentasDetalleScreen} />
        <Stack.Screen name="NuevaCuenta" component={NuevaCuentaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
