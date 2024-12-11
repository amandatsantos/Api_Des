import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

interface CardProps {
  data: {
    name: string;
    email: string;
    bornDate: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.email}>{data.email}</Text>
      <Text style={styles.bornDate}>{data.bornDate}</Text>
      <Text>{data.status === 'active' ? 'Ativo' : 'Inativo'}</Text>
    </View>
  );
};

export default Card;