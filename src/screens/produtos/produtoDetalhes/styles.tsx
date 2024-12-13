import { StyleSheet } from 'react-native';
import { theme } from '../../../../theme';

export default StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: theme.light.background },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    label: { fontSize: 16, marginBottom: 5 },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
    },
    buttonContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
    statusButton: {
      flex: 1,
      padding: 10,
      marginHorizontal: 5,
      alignItems: 'center',
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    button: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    ativoButton: {
      backgroundColor: 'green',
    },
    inativoButton: {
      backgroundColor: 'red',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 10,
    },
    picker: {
      height: 40,
      width: '100%',
    },
    
  });