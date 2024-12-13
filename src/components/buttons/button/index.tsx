// Importa os componentes necessários do React Native e os estilos personalizados
import { Pressable, PressableProps, Text, View } from "react-native";
import styles from "./styles";
import global from "../../../styles/global";

// Define os possíveis estilos de botão como um tipo (primary, warning, error e transparent)
type StyleKeys = 'primary' | 'warning' | 'error' | 'transparent';

// Define as propriedades do botão, incluindo as de Pressable e propriedades personalizadas
type ButtonProps = PressableProps & {
    title: string;        // Título do botão, exibido como texto
    className: StyleKeys; // Estilo do botão, que determina a aparência
    color: string;
};

// Função principal do componente Button
export default function Button({ title, className, ...rest }: ButtonProps) {
    
    // Define o estilo do texto, usando uma condicional para aplicar estilos específicos se o botão for 'transparent'
    const styleText = className === 'transparent' 
        ? [global.title, styles.transparentText] // Estilos para texto transparente
        : [global.title, styles.text];           // Estilo padrão do texto

    return (
        // Contêiner do botão com o estilo básico
        <View style={styles.container}>
            
            {/* Componente Pressable, tornando o botão interativo.
                Aplica o estilo específico de acordo com o 'className' e inclui o estilo base do botão.
                Repassa quaisquer outras propriedades usando 'rest'. */}
            <Pressable style={[styles[className], styles.button]} {...rest}>
                
                {/* Componente Text para exibir o título do botão, com o estilo determinado */}
                <Text style={styleText}>{title}</Text>
            </Pressable>
        </View>
    );
}