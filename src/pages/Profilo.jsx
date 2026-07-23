import { View, Text, StyleSheet } from 'react-native';

export default function Profilo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Il Tuo Profilo</Text>
      <Text style={styles.text}>Qui verranno mostrati i dati di sessione dell'utente autenticato.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  text: { fontSize: 16, color: '#666' }
});
