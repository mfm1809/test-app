import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benvenuto ...</Text>
      <Text style={styles.text}>HP del portale (react-native-web) visibile a tutti gli utenti.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  text: { fontSize: 16, color: '#666', lineHeight: 22 }
});
