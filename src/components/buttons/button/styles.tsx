// Importa a função StyleSheet do React Native para criar estilos e o tema personalizado
import { StyleSheet } from "react-native";
import { theme } from "../../../../theme";

// Define os estilos usando StyleSheet.create
const styles = StyleSheet.create({
    
    // Estilo do contêiner principal do botão, definindo largura e altura
    container: {
        width: '35%',  // Largura total
        height: 65,     // Altura fixa do contêiner
       // paddingVertical: 10, // Margem vertical para separar do texto ou outros elementos
        marginBottom: 0, // Adiciona espaçamento entre os botões no contêiner
        marginRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Estilo base do botão, aplicado em conjunto com os estilos específicos (ex: primary, warning)
    button: {
        width: '70%',             // Largura total do botão
        height: 45,                // Altura fixa do botão
        borderRadius: 12,          // Bordas arredondadas para uma aparência circular
        alignItems: 'center',      // Alinhamento centralizado do conteúdo horizontalmente
        justifyContent: 'center',  // Alinhamento centralizado do conteúdo verticalmente
        color: theme.light.backgroundInputs, // Cor do texto do botão (ajustada pelo tema)
    },

    // Estilo padrão para o texto do botão, usando a cor definida no tema
    text: {
        color: theme.light.backgroundInputs, // Cor padrão do texto
    },

    // Estilo específico para o texto de botões transparentes, com cor diferenciada do tema
    transparentText: {
        color: theme.light.text, // Cor do texto para botões transparentes
    },

    // Estilo para o botão primário, usando uma cor de fundo de sucesso do tema
    primary: {
        backgroundColor: theme.light.success, // Cor de fundo para o botão primário
    },

    // Estilo para o botão de aviso (warning), usando cor de aviso do tema
    warning: {
        backgroundColor: theme.light.warning, // Cor de fundo para o botão de aviso
    },

    // Estilo para o botão de erro, usando cor de erro do tema
    error: {
        backgroundColor: theme.light.error, // Cor de fundo para o botão de erro
    },

    // Estilo para o botão transparente, onde o fundo usa a cor de background do tema
    transparent: {
        backgroundColor: theme.light.background, // Cor de fundo transparente
    },
});

export default styles;