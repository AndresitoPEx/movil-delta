import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

//importamos firebase
import appDelta from '../../credencias' //importamos la conexion a firebase
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
const db = getFirestore(appDelta);


export default function CrearProducto(props) {

    const estadoInicial = {
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        stock: '',
        imagen: '',
    }

    const [producto, setProducto] = useState(estadoInicial);

    const handleChangeText = (value, nombre) => {
        setProducto({ ...producto, [nombre]: value });
    }

    const guardarProducto = async () => {
        try{
            
            const docRef = await addDoc(collection(db, "productos"), {
                ...producto

            });
            Alert.alert("Producto registrado exitosamente");
            // Alert.alert("Document written with ID: ", docRef.id);
            setProducto(estadoInicial);
            props.navigation.navigate('Lista de Productos');
        }catch{
            console.log("Error al guardar el producto");
        }
        //console.log(producto);
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title} >Crear Producto</Text>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre del Producto"
                    onChangeText={(value) => handleChangeText(value, 'nombre')}
                    value={producto.nombre}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Precio del Producto"
                    onChangeText={(value) => handleChangeText(value, 'precio')}
                    value={producto.precio}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Descripcion del Producto"
                    onChangeText={(value) => handleChangeText(value, 'descripcion')}
                    value={producto.descripcion}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Categoria del Producto"
                    onChangeText={(value) => handleChangeText(value, 'categoria')}
                    value={producto.categoria}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Stock del Producto"
                    onChangeText={(value) => handleChangeText(value, 'stock')}
                    value={producto.stock}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Imagen del Producto"
                    onChangeText={(value) => handleChangeText(value, 'imagen')}
                    value={producto.imagen}
                />
            </View>
            <View style={styles.inputGroup}>
                <Button
                    title="Guardar Producto"
                    onPress={() => guardarProducto()}
                />
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
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',

    }
});



