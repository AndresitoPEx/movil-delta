import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importamos firebase
import appDelta from '../../credencias'; // Importamos la conexión a Firebase
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const db = getFirestore(appDelta);

export default function VerProducto(props) {

  const navigation = useNavigation();

  const [producto, setProducto] = useState({});

  const getOneProduct = async (id) => {
    
    try {
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);
      setProducto(docSnap.data());
    } catch (error) {
      console.log('Error al obtener el producto:', error);
    }
  };

  useEffect(() => {
    getOneProduct(props.route.params.id);
  }, []);



  const handleEliminar = async(id) => {
    // Lógica para eliminar el producto
    await deleteDoc(doc(db, 'productos', id));
    Alert.alert('Producto eliminado exitosamente');
    
    navigation.navigate('Lista de Productos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Producto</Text>
      <View style={styles.productoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.texto}>{producto.nombre}</Text>
      </View>
      <View style={styles.productoContainer}>
        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.texto}>{producto.precio}</Text>
      </View>
      <View style={styles.productoContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.texto}>{producto.descripcion}</Text>
      </View>
      <View style={styles.productoContainer}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.texto}>{producto.categoria}</Text>
      </View>
      <View style={styles.productoContainer}>
        <Text style={styles.label}>Stock:</Text>
        <Text style={styles.texto}>{producto.stock}</Text>
      </View>
      <View style={styles.productoContainer}>
        <Text style={styles.label}>Imagen:</Text>
        <Text style={styles.texto}>{producto.imagen}</Text>
      </View>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>handleEliminar(props.route.params.id)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
  },
  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  texto: {
    color: 'black',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
