import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#31233E', // Cor de fundo da navbar
        padding: 10,
        height: 50,
        position: 'absolute',
        bottom: 0,  // Fixar na parte inferior
        left: 0,
        right: 0,
    },
    navItem: {
      color: 'white',
      fontSize: 18,
    },
  });

export default styles;