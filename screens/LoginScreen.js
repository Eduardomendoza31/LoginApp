import React from 'react';
import {
  View, Image, TextInput, Text, Pressable,
  StyleSheet, ScrollView, Alert, Dimensions
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';


// Esquema de validación con Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es requerida'),
});

const LoginScreen = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      Alert.alert('Éxito', `Iniciando sesión con: ${values.email}`);
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>

        {/* 1. Imagen de cabecera */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logoapp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* 2. Tarjeta contenedora */}
        <View style={styles.card}>

          {/* 3. Inputs controlados con Formik */}
          <TextInput
            style={[styles.input, formik.touched.email && formik.errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          )}

          <TextInput
            style={[styles.input, formik.touched.password && formik.errors.password && styles.inputError]}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}

          {/* 4. Botón Pressable con estilo dinámico */}
          <Pressable
            onPress={formik.handleSubmit}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </Pressable>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#687072',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 180,
    height: 180,
  },
  // Tarjeta contenedora con sombra
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    elevation: 10,           // Android
    shadowColor: '#000',     // iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#687072',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPressed: {
    backgroundColor: '#4a5254',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;