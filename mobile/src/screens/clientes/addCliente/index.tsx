import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../../../components/navBar';

const API_URL = 'http://192.168.0.107:5265'; 

export default function AdicionarCliente() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bornDate, setBornDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  // Função para abrir o DatePicker
  const showDatePicker = () => {
    setShowPicker(true);
  };

  // Função para lidar com a alteração da data
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Fecha o DatePicker após a seleção
    if (selectedDate) {
      setBornDate(selectedDate);
    }
  };

  // Função para adicionar cliente
  const adicionarCliente = async () => {
    if (!name || !email || !bornDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/clients`, {
        name,
        email,
        bornDate: bornDate.toISOString().split('T')[0], 
      });
      setName('');
      setEmail('');
      //setBornDate(null);
      Alert.alert('Sucesso', 'Cliente adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text>
          {bornDate ? bornDate.toLocaleDateString('pt-BR') : 'Data de nascimento'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={bornDate || new Date()} // Data padrão: hoje
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'} // Comportamento do iOS e Android
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={adicionarCliente}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <Navbar />
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
