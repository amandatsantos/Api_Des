import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../../navigation/routesParams';
import axios from 'axios';
import styles from './styles';

// Tipos
type ClienteDetalhesRouteProp = RouteProp<RoutesParams, 'EditarCliente'>;
type ClienteDetalhesNavigationProp = StackNavigationProp<RoutesParams, 'EditarCliente'>;

const EditarCliente: React.FC = () => {
  const route = useRoute<ClienteDetalhesRouteProp>(); 
  const navigation = useNavigation<ClienteDetalhesNavigationProp>(); 
  const { cliente } = route.params; 

  const { id } = cliente;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bornDate, setBornDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://192.168.0.107:5265/api/clients/${id}`);
        const clienteData = response.data;
        setName(clienteData.name); // Nome vindo do backend
        setEmail(clienteData.email);
        setBornDate(clienteData.bornDate);
        setStatus(clienteData.status); // Status vindo do backend
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar cliente:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do cliente.');
      }
    };

    fetchCliente();
  }, [cliente.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  

  const mudarEstadoCliente = async () => {
    try {
      await axios.delete(`http://192.168.0.107:5265/api/clients/${cliente.id}/inactivate`);
      Alert.alert('Sucesso', 'Cliente inativado.');
      navigation.goBack(); 
    } catch (error) {
      console.error('Erro ao inativar cliente:', error);
      Alert.alert('Erro', 'Não foi possível inativar o cliente.');
    }
  };

  const salvarAlteracoes = async () => {
    try {
      await axios.put(`http://192.168.0.107:5265/api/clients/${cliente.id}`, {
        name,
        status,
      });
      Alert.alert('Sucesso', 'Cliente atualizado com sucesso.');
     // mudarEstadoCliente();
      navigation.goBack(); 
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Nome do cliente"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />

    <Text style={styles.label}>Data de nascimento</Text>
      <TextInput
        style={styles.input}
        value={bornDate}
        onChangeText={(text) => setBornDate(text)}
        placeholder="Data nascimento"
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Status"
      />

      <View style={styles.buttonContainer}>
        <Button title="Salvar" color='#92bea5' onPress={salvarAlteracoes} />
        <Button title="Cancelar" color="red" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};
export default EditarCliente;
