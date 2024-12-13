import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Navbar from '../../components/navBar';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'; 
import { RoutesParams } from '../../navigation/routesParams';  
import styles from './styles';
import { produtosData } from '../../mockk/dados';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type NavigationProps = StackNavigationProp<RoutesParams>;

export default function ProductsScreen() {
    const navigation = useNavigation<NavigationProps>();

    const [produtos, setProdutos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProdutos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://192.168.0.107:5265/api/products');
        setProdutos(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      }
    };

    getProdutos();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Produtos</Text>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R${item.price}</Text>
              <Text style={styles.productBrand}>Marca: {item.brand}</Text>
              <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 40 }} />}
        />

        <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AdicionarProduto')}
      ><Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

        <Navbar/>

      </View>
    );
  }