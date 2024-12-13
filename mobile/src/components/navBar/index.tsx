import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../navigation/routesParams'; 

type HomeScreenNavigationProp = StackNavigationProp<RoutesParams, 'Clientes'>;
type ProdutosScreenNavigationProp = StackNavigationProp<RoutesParams, 'Produtos'>;
type ComprasScreenNavigationProp = StackNavigationProp<RoutesParams, 'Compras'>;

const Navbar = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Clientes')}>
        <Text style={styles.navItem}>Clientes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Compras')}>
        <Text style={styles.navItem}>Compras</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
        <Text style={styles.navItem}>Produtos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;