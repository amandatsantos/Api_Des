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
  });