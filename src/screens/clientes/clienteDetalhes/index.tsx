import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../../navigation/routesParams';
import axios from 'axios';
import { theme } from '../../../../theme';

type ClienteDetalhesRouteProp = RouteProp<RoutesParams, 'ClienteDetalhes'>;
type ClienteDetalhesNavigationProp = StackNavigationProp<RoutesParams, 'ClienteDetalhes'>;

const ClienteDetalhes: React.FC = () => {
  const route = useRoute<ClienteDetalhesRouteProp>(); // Acessa os parâmetros da rota
  const navigation = useNavigation<ClienteDetalhesNavigationProp>(); // Acessa a navegação
  const { cliente } = route.params; // Obtém o cliente dos parâmetros

  // Função para excluir o cliente
  const excluirCliente = async () => {
    try {
      await axios.delete(`http://192.168.0.107:5265/api/clients/delete/${cliente.id}`);
      Alert.alert('Sucesso', 'Cliente excluído com sucesso.');
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      Alert.alert('Erro', 'Não foi possível excluir o cliente.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Cliente</Text>
      <Text>Nome: {cliente.name}</Text>
      <Text>Email: {cliente.email}</Text>
      <Text>Nascimento: {cliente.bornDate}</Text>
      <Text>Status: {cliente.status}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Editar" color= "#92bea5" onPress={() => navigation.navigate('EditarCliente', { cliente })} />
        <Button title="Excluir" color="red" onPress={excluirCliente} />
        <Button title="Cancelar" color= "#92bea5" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.light.background },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
});

export default ClienteDetalhes;
