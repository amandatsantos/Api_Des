import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ClientesScreen from '../screens/clientes';  
import { RoutesParams } from './routesParams';
import PurchasesScreen from '../screens/compras';
import ProductsScreen from '../screens/produtos';
import AdicionarCliente from '../screens/clientes/addCliente';
import AdicionarCompra from '../screens/compras/addCompra';
import AdicionarProduto from '../screens/produtos/addProduto';
import EditarCliente from '../screens/clientes/editarCliente';
import ClienteDetalhes from '../screens/clientes/clienteDetalhes';
import ProdutoDetalhes from '../screens/produtos/produtoDetalhes';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Clientes">
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="Produtos" component={ProductsScreen}/>
        <Stack.Screen name="Compras" component={PurchasesScreen}/>
        <Stack.Screen name="AdicionarCliente" component={AdicionarCliente} />
        <Stack.Screen name="AdicionarCompra" component={AdicionarCompra} />
        <Stack.Screen name="AdicionarProduto" component={AdicionarProduto} />
        <Stack.Screen name="ClienteDetalhes" component={ClienteDetalhes} />
        <Stack.Screen name="EditarCliente" component={EditarCliente} />
        <Stack.Screen name="ProdutoDetalhes" component={ProdutoDetalhes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
