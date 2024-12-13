import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../../navigation/routesParams';
import axios from 'axios';
import { theme } from '../../../../theme';

type ProdutoDetalhesRouteProp = RouteProp<RoutesParams, 'ProdutoDetalhes'>;
type ProdutoDetalhesNavigationProp = StackNavigationProp<RoutesParams, 'ProdutoDetalhes'>;

const ProdutoDetalhes: React.FC = () => {
  const route = useRoute<ProdutoDetalhesRouteProp>(); 
  const navigation = useNavigation<ProdutoDetalhesNavigationProp>(); 
  const { produto } = route.params; 

  const excluirProduto = async () => {
    try {
      await axios.delete(`http://192.168.0.107:5265/api/clients/delete/${produto.id}`);
      Alert.alert('Sucesso', 'Produto excluído com sucesso.');
      navigation.goBack(); 
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do produto</Text>
      <Text>R$ {produto.price}</Text>
      <Text>Marca: {produto.brand}</Text>
      <Text>Estoque: {produto.quantity}</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Excluir" color="red" onPress={excluirProduto} />
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

export default ProdutoDetalhes;
