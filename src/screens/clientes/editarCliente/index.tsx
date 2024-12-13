import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../../navigation/routesParams';
import axios from 'axios';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
// Tipos
type ClienteDetalhesRouteProp = RouteProp<RoutesParams, 'EditarCliente'>;
type ClienteDetalhesNavigationProp = StackNavigationProp<RoutesParams, 'EditarCliente'>;

const EditarCliente: React.FC = ( ) => {
  const route = useRoute<ClienteDetalhesRouteProp>(); 
  const navigation = useNavigation<ClienteDetalhesNavigationProp>(); 
  const { cliente } = route.params; 

  const { id } = cliente;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bornDate, setBornDate] = useState<string>('');
  const [status, setStatus] = useState<string>(cliente.status);
  const [loading, setLoading] = useState<boolean>(true);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://192.168.0.107:5265/api/clients/${id}`);
        const clienteData = response.data;
        setName(clienteData.name); 
        setEmail(clienteData.email);
        setBornDate(clienteData.bornDate);
        setStatus(clienteData.status); 
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
      const novaRota = status === 'Ativo' ? 'inactivate' : 'activate'; 
      await axios.delete(`http://192.168.0.107:5265/api/clients/${cliente.id}/inactivate`);
      
      const novoStatus = status === 'active' ? 'inactive' : 'active'; 
      setStatus(novoStatus);

      Alert.alert('Sucesso', `Cliente agora está ${novoStatus}.`);
    } catch (error) {
      console.error('Erro ao mudar estado do cliente:', error);
      Alert.alert('Erro', 'Não foi possível alterar o estado do cliente.');
    }
  };

  const salvarAlteracoes = async () => {
    try {
      const formattedDate = new Date(bornDate).toISOString().split('T')[0];
      
      await axios.put(`http://192.168.0.107:5265/api/clients/${cliente.id}`, {
        name,
        email, 
        bornDate: formattedDate,
        status,
      });
      Alert.alert('Sucesso', 'Cliente atualizado com sucesso.');
      navigation.goBack(); 
    } catch (error) {
      console.log({
        name,
        email, 
        bornDate,
        status,
        
      });
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

<View style={styles.container}>
      <Text style={styles.label}>Status Atual: {status}</Text>
      
      <TouchableOpacity
        style={[
          styles.button,
          status === 'Ativo' ? styles.inativoButton : styles.ativoButton,
        ]}
        onPress={mudarEstadoCliente}
      >
        <Text style={styles.buttonText}>
          {status === 'Ativo' ? 'Inativar Cliente' : 'Ativar Cliente'}
        </Text>
      </TouchableOpacity>
    </View>

      

      <View style={styles.buttonContainer}>
        <Button title="Salvar" color='#92bea5' onPress={() => salvarAlteracoes()} />
        <Button title="Cancelar" color="red" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};
export default EditarCliente;
