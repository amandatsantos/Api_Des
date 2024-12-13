import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.light.background,
      
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    compraCard: {
      //position: 'absolute',
      backgroundColor: '#fff',
      padding: 16,
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      top: 10,
    },
    compraTotal: {
      fontSize: 16,
      color: '#2ecc71',
    },
    compraStatus: {
      fontSize: 16,
      color: '#2ecc71',
    },
    produtosCompra: {
      fontSize: 16,
      color: '#2ecc71',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 16,
        width: 60,
        height: 60,
        backgroundColor: '#92bea5',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
  });
  
export default styles;