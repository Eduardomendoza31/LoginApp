import React, { useState } from 'react';
import {
  View, Image, TextInput, Text, Pressable,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es requerida'),
});

const LoginScreen = ({ navigation }) => {
  const [isRegistro, setIsRegistro] = useState(false);

  const formik = useFormik({
    initialValues: { nombre: '', email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        if (isRegistro) {
          const cred = await createUserWithEmailAndPassword(auth, values.email, values.password);
          await updateProfile(cred.user, { displayName: values.nombre });
          Alert.alert('¡Cuenta creada!', `Bienvenido, ${values.nombre}`);
          setIsRegistro(false);
          formik.resetForm();
        } else {
          const cred = await signInWithEmailAndPassword(auth, values.email, values.password);
          const nombre = cred.user.displayName || cred.user.email;
          navigation.navigate('DashboardScreen', { nombre });
        }
      } catch (error) {
        const mensajes = {
          'auth/user-not-found':       'No existe una cuenta con ese email.',
          'auth/wrong-password':       'Contraseña incorrecta.',
          'auth/email-already-in-use': 'Ese email ya está registrado.',
          'auth/invalid-email':        'Email inválido.',
        };
        Alert.alert('Error', mensajes[error.code] || error.message);
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logoapp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>

          {isRegistro && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#aaa"
                value={formik.values.nombre}
                onChangeText={formik.handleChange('nombre')}
                onBlur={formik.handleBlur('nombre')}
              />
            </>
          )}

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

          <Pressable
            onPress={formik.handleSubmit}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>
              {isRegistro ? 'Registrarse' : 'Ingresar'}
            </Text>
          </Pressable>

          <Pressable onPress={() => { setIsRegistro(!isRegistro); formik.resetForm(); }}>
            <Text style={styles.toggleText}>
              {isRegistro
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate'}
            </Text>
          </Pressable>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: '#687072' },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  logo: { width: 180, height: 180 },
  card: {
    flex: 1, backgroundColor: '#fff',
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 30, elevation: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1, shadowRadius: 6,
  },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 6, fontSize: 16, color: '#333' },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 10, marginLeft: 4 },
  button: { backgroundColor: '#687072', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 10 },
  buttonPressed: { backgroundColor: '#4a5254' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  toggleText: { textAlign: 'center', marginTop: 16, color: '#687072', fontWeight: '600' },
});

export default LoginScreen;