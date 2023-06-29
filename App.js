import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//componentes
import ListarProductos from './screens/productos/ListarProductos';
import CrearProducto from './screens/productos/CrearProducto';
import VerProducto from './screens/productos/VerProducto';


export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Lista de Productos' component={ListarProductos} />
        <Stack.Screen name='Agregar Producto' component={CrearProducto} />
        <Stack.Screen name='Ver Producto' component={VerProducto} />
      </Stack.Navigator>
    );
  }


  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'darkblue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 24,
//   }
// });
