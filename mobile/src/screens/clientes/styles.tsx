// Importa a função StyleSheet do React Native e o tema personalizado
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

// Define os estilos usando StyleSheet.create
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 60,
    },
    // Estilo para o contêiner do título
    containerSearch: {
        justifyContent: 'space-around',           // Centraliza verticalmente
        alignItems: 'center',               // Centraliza horizontalmente
        flexDirection: 'row',
        width: '100%',
        height: 100,
        
        
    },

    // Estilo específico para o título
    title: {
        fontWeight: 'bold',                 // Texto em negrito
        color: theme.light.success          // Cor do texto do título, vinda do tema
        
    },

    // Estilo para o contêiner do formulário de login
    containerForm: {        
        justifyContent: 'center',                              // Ocupa 60% da altura total da tela
        
    },

    // Estilo para o contêiner dos botões de navegação
    containerButtons: {
        position: 'absolute',
        bottom: 0, // Distância do fundo
        right: 0,  // Distância da borda direita
        alignItems: 'center',  // Alinha os botões verticalmente
        flexDirection: 'row',   // Faz os botões ficarem lado a lado
        justifyContent: 'center', // Centraliza os botões horizontalmente
        width: '100%',           // Ocupa toda a largura da tela
        //marginTop: 10,           // Espaço no topo
        //marginRight: 48,
        backgroundColor: '#31233E',
        flex: 1,

    },
    clienteCard: {
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
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      clienteItem: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      },
      clienteText: {
        fontSize: 16,
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