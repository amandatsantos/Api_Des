import { StyleSheet } from "react-native";
import { theme } from "../../theme";

const global = StyleSheet.create({

    text: {
        color: theme.light.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        fontFamily: 'Text',
        opacity: 0.7,
    },
    title: {
        color: theme.light.text,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Title',
        marginBottom: -5,
    },
    container: {
       
        width: '100%',                      
        padding: 16,                     
        flex: 1,
        backgroundColor: theme.light.background, 
        flexDirection: 'row',
        
    }
});

export default global;
