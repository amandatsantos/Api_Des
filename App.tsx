import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importa o contêiner de navegação
import { createStackNavigator } from '@react-navigation/stack'; // Importa o stack navigator
import Home from './src/screens/clientes'; // Importe a tela Home
import Produtos from './src/screens/produtos';
import Compras from './src/screens/compras';
import AppNavigation from './src/navigation/AppNavigation';

// Cria o tipo para o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <AppNavigation />
  );
}
