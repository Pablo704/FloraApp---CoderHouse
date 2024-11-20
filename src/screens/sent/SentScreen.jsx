import { StyleSheet, Text, FlatList } from 'react-native';
import Cards from "../../components/Cards";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../global/colors';
import  receipts from '../../data/receipts.json'

const SentScreen = () => {
    
    const renderReceiptItem = ({ item }) => {
        const total = Array.isArray(item.item)
            ? item.item.reduce((acumulador, currentItem) => acumulador + currentItem.price * currentItem.quantity, 0)
            : 0;

        const dateOptions={
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour:'2-digit',
                minute:'2-digit',
                hour12: false
            }
            const createdAtDate = new Date(item.createdAt);
            const estimatedDeliveryDate = new Date(createdAtDate);
            estimatedDeliveryDate.setDate(createdAtDate.getDate() + 5);
    

        return (
            <Cards style={styles.receiptContainer}>
                <Text style={styles.title}>Recibo nro: {item.id}</Text>
                <Text style={styles.date}>
                    Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs
                </Text>
                <Text style={styles.date}>
                    Envío estimado: {estimatedDeliveryDate.toLocaleDateString('es-AR', dateOptions)} Hs
                </Text>
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                <Icon name='visibility' size={24} style={styles.viewIcon} />
            </Cards>
        );
    };

    return (
        <FlatList
            data={receipts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderReceiptItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Detalles Envíos:</Text>}
            ListEmptyComponent={<Text>No hay envíos disponibles.</Text>}
        />
    );
};

export default SentScreen

const styles = StyleSheet.create({
    cartScreenTitle:{
        fontSize:20,
        fontWeight:700,
        textAlign: "center",
        paddingVertical: 30,
      },
      receiptContainer:{
        padding:20,
        justifyContent: "flex-start",
        gap: 10,
      },
      title:{
        fontWeight:'700',
        color: colors.backgroundApp
      },
      date:{
        color: colors.backgroundApp
      },
      total:{
        fontSize:16,
        fontWeight:'700',
        color: colors.backgroundApp
      },
      viewIcon:{
        color: colors.backgroundApp,
        alignSelf: 'flex-end'
      },
      getProductContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundApp,
      },
      
}) 