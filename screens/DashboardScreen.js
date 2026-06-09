import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen({ route }) {
  const { nombre } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Bienvenido!</Text>
      <Text style={styles.nombre}>{nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  emoji:   { fontSize: 60, marginBottom: 10 },
  titulo:  { fontSize: 26, fontWeight: 'bold', color: '#333' },
  nombre:  { fontSize: 20, color: '#687072', marginTop: 8 },
});