import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../../../components/navBar';
import { RoutesParams } from '../../../navigation/routesParams';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type AdicionarCompraRouteProp = RouteProp<RoutesParams, 'AdicionarCompra'>;
type ClienteDetalhesRouteProp = RouteProp<RoutesParams, 'ClienteDetalhes'>;
type AdicionarCompraNavigationProp = StackNavigationProp<RoutesParams, 'AdicionarCompra'>;

const API_URL = 'http://localhost:5265'; 

export default function AdicionarCompra() {
  
  const route = useRoute<ClienteDetalhesRouteProp>(); 
  
  const { cliente } = route.params; 

  const { id } = cliente;

  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('');
  const [id_client, setId_client] = useState(cliente.id)
  const [id_product, setId_product] = useState('');
  
  const adicionarCompra = async () => {
    if (!total || !status || !id_product || !id_client) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(API_URL, { 
        total, 
        status,
        id_client,
        id_product
      });
      setTotal('');
      setStatus('');
      setId_client('');
      setId_product('');
      Alert.alert('Sucesso', 'Compra adicionada com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar compra.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Compra</Text>

      <TextInput
        style={styles.input}
        placeholder="Total"
        value={total}
        onChangeText={setTotal}
      />

      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={adicionarCompra}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <Navbar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#D1DAB9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#92bea5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
