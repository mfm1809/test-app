import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profilo from './pages/Profilo';
import Aziende from './pages/Aziende';
import Login from './pages/Login';

function App() {
  // Stato globale per sapere si l'utente è autenticato o meno
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  // Se l'utente NON è loggato, mostriamo SOLO la schermata di login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  // Se l'utente È loggato, sblocchiamo tutta l'applicazione con il Menu

  return (
    <Router>
      {/* HEADER CON MENU DI NAVIGAZIONE ON TOP */}
      <header style={{ 
        backgroundColor: '#0078d4', 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Azure Portal App</div>
        <nav style={{ display: 'flex', gap: '20px' }}>
          {/* Usiamo Link al posto di <a href> per non ricaricare la pagina */}
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link to="/aziende" style={{ color: '#fff', textDecoration: 'none' }}>Aziende</Link>
          <Link to="/profilo" style={{ color: '#fff', textDecoration: 'none' }}>Profilo</Link>
          <button onClick={handleLogout} style={{ backgroundColor: '#d83b01', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Esci</button>
        </nav>
      </header>

      {/* CONTENUTI DELLE PAGINE DINAMICHE */}
      <main style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f9', minHeight: 'calc(100vh - 54px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aziende" element={<Aziende />} />
          <Route path="/profilo" element={<Profilo />} />
          {/* Se un utente prova ad andare su /login da loggato, lo rispediamo alla Home */}
          <Route path="/login" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;