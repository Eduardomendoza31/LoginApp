import React from 'react';
import { View, Image, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>

      {/* Zona de Branding */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logoapp.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Zona de Formulario - Parte 2 */}
      <View style={styles.formContainer}>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Contraseña" />
        <Button title="Ingresar" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#687072', 
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  formContainer: {
    flex: 1,
  },
});

export default LoginScreen;