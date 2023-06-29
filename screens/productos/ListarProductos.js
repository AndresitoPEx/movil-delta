import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importamos firebase
import appDelta from '../../credencias'; // Importamos la conexión a Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const db = getFirestore(appDelta);

export default function ListarProductos() {

    const [listar, setListar] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const datos = await getDocs(collection(db, 'productos'));
                const arrayDatos = datos.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setListar(arrayDatos);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerDatos();
    }, [listar]);

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Bienvenido a Delta Store</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agregar Producto')}>
                <Text style={styles.buttonText}>Crear Producto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ver Producto')}>
                <Text style={styles.buttonText}>Ver Producto</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Lista de Productos</Text>
            <View>
                {listar.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.elementoProducto}
                        onPress={() => navigation.navigate('Ver Producto', { id: item.id })}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.productoNombre}>{item.nombre}</Text>
                            <Text style={styles.productoStock}>Stock: {item.stock}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 10,
    },
    title: {
        color: 'black',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#f5821f',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    elementoProducto: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productoNombre: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    productoPrecio: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
    productoStock: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
});
