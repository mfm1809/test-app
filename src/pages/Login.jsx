import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePressLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Credenziali non valide! Usa admin / admin.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Accedi al Portale</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            value={username} 
            onChangeText={setUsername} // In React Native si usa onChangeText al posto di onChange
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={true} // Nasconde i caratteri della password
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handlePressLogin}>
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f9', padding: 20 },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 8, width: '100%', maxWidth: 340, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, color: '#666' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, fontSize: 16 },
  button: { backgroundColor: '#0078d4', padding: 12, borderRadius: 4, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
