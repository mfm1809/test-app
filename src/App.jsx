import { useState } from 'react';
import { Router, Routes, Route, Link, Navigate } from './CustomRouter'; 
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Home from './pages/Home';
import Profilo from './pages/Profilo';
import Aziende from './pages/Aziende';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <Router>
      <SafeAreaView style={styles.container}>
        {/* HEADER DI NAVIGAZIONE ON TOP */}
        <View style={styles.header}>
          <Text style={styles.logo}>Azure Portal App</Text>
          
          <View style={styles.nav}>
            <Link to="/" underlayColor="transparent">
              <Text style={styles.navLink}>Home</Text>
            </Link>
            
            <Link to="/aziende" underlayColor="transparent">
              <Text style={styles.navLink}>Aziende</Text>
            </Link>
            
            <Link to="/profilo" underlayColor="transparent">
              <Text style={styles.navLink}>Profilo</Text>
            </Link>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Esci</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CORPO DELLE PAGINE GESTITO DAL ROUTER */}
        <View style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aziende" element={<Aziende />} />
            <Route path="/profilo" element={<Profilo />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        </View>
      </SafeAreaView>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9' },
  header: { backgroundColor: '#0078d4', paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifySWA: 'space-between', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  nav: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  navLink: { color: '#fff', fontSize: 16, fontWeight: '500' },
  logoutButton: { backgroundColor: '#d83b01', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, marginLeft: 10 },
  logoutText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  main: { flex: 1 }
});

export default App;
