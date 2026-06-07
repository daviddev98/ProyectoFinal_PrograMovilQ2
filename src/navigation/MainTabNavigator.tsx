import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FloatingTabBar from '../components/FloatingTabBar';
import CuentasScreen from '../screens/cuentas/CuentasScreen';
import InicioScreen from '../screens/main/InicioScreen';
import MetasScreen from '../screens/metas/MetasScreen';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Metas" component={MetasScreen} />
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Cuentas" component={CuentasScreen} />
    </Tab.Navigator>
  );
}
