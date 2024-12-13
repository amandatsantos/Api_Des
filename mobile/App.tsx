import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import AppNavigation from './src/navigation/AppNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppNavigation />
  );
}
