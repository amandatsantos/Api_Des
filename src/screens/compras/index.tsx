import { useNavigation } from "@react-navigation/native";
import { RoutesParams } from "../../navigation/routesParams";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { comprasData } from "../../mockk/dados";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from "../../components/navBar";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProps = StackNavigationProp<RoutesParams>;

export default function PurchasesScreen(){
  const navigation = useNavigation<NavigationProps>();
    
    return (
        <View style={styles.container}>
        
        <FlatList
          data={comprasData}
          keyExtractor={(item) => item.id_client}
          renderItem={({ item }) => (
            <View style={styles.compraCard}>
              <Text style={styles.title}>Cliente:</Text>
              <Text style={styles.compraTotal}>Produtos: </Text>
              <Text style={styles.compraTotal}>Quantdade:</Text>
              <Text style={styles.compraTotal}>Total: R${item.total}</Text>
              <Text style={styles.compraStatus}>Status: {item.status}</Text>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 40 }} />}
        />

        <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AdicionarCompra')}
      ><Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

        <Navbar/>

      </View>
    )
}