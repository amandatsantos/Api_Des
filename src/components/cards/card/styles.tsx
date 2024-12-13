import { StyleSheet } from "react-native";
import { theme } from "../../../../theme";

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: '#666',
      marginBottom: 5,
    },
    bornDate: {
      fontSize: 14,
      color: '#888',
    },
  });
  

export default styles;