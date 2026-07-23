import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Home from './pages/Home';
import Profilo from './pages/Profilo';
import Aziende from './pages/Aziende';
import Login from './pages/Login';

function App() {
  // Stato per l'autenticazione
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Stato per gestire la navigazione interna (sostituisce React Router)
  const [currentPage, setCurrentPage] = useState('Home');

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('Home');
  };

  // 1. Se l'utente NON è loggato, mostriamo SOLO il componente Login di React Native
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  // Funzione per decidere quale pagina mostrare nel corpo centrale
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'Aziende':
        return <Aziende />;
      case 'Profilo':
        return <Profilo />;
      default:
        return <Home />;
    }
  };

  // 2. Se l'utente È loggato, sblocchiamo la Dashboard con l'Header Native
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER DI NAVIGAZIONE ON TOP */}
      <View style={styles.header}>
        <Text style={styles.logo}>Azure Portal App -- react native web</Text>
        
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => setCurrentPage('Home')}>
            <Text style={[styles.navLink, currentPage === 'Home' && styles.activeLink]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setCurrentPage('Aziende')}>
            <Text style={[styles.navLink, currentPage === 'Aziende' && styles.activeLink]}>Aziende</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setCurrentPage('Profilo')}>
            <Text style={[styles.navLink, currentPage === 'Profilo' && styles.activeLink]}>Profilo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Esci</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CORPO DELLA PAGINA DINAMICA */}
      <View style={styles.main}>
        {renderPage()}
      </View>
    </SafeAreaView>
  );
}

// STILI IN STILE REACT NATIVE (StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  header: {
    backgroundColor: '#0078d4',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navLink: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  activeLink: {
    fontWeight: 'bold',
    opacity: 1,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: '#d83b01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
  },
});

export default App;
