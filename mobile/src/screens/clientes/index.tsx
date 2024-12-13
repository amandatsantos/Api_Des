import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Alert, Text, ActivityIndicator } from 'react-native';
import global from "../../styles/global";
import styles from "./styles";
import Card from '../../components/cards/card';
import Navbar from '../../components/navBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../navigation/routesParams';
import axios from 'axios';

type NavigationProps = StackNavigationProp<RoutesParams>;

export default function Clientes() {
  const navigation = useNavigation<NavigationProps>();

  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getClientes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://192.168.0.107:5265/api/clients');
        setClientes(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar clientes:', error);
        Alert.alert('Erro', 'Não foi possível carregar os clientes.');
      }
    };

    getClientes();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={global.container}>
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ClienteDetalhes', { cliente: item })}>
            <Card data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AdicionarCliente')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Navbar />
    </View>
  );
}
