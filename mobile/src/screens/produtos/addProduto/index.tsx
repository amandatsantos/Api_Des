import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import Navbar from '../../../components/navBar';
import styles from './styles';
import baseURL from './../../../config/aaa';

const API_URL = 'http://192.168.0.107:5265';  

export default function AdicionarProduto() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const adicionarProdutoNaAPI = async () => {
    if (!name || !brand || !price || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      Alert.alert('Erro', 'Por favor, insira um preço válido.');
      return;
    }

    const quantityValue = parseInt(quantity, 10);
    if (isNaN(quantityValue)) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/products`, { 
        name,
        brand,
        price: priceValue,
        quantity: quantityValue,
      });

      setName('');
      setBrand('');
      setPrice('');
      setQuantity('');
      
      Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={adicionarProdutoNaAPI}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <Navbar/>
    </View>
  );
}
