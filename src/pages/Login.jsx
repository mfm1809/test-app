import { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulazione di un controllo credenziali (es. admin / admin)
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLoginSuccess(); // Notifica ad App.jsx che il login è avvenuto
    } else {
      setError('Credenziali non valide! Usa admin / admin per il test.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '320px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Accedi al Portale</h2>
        
        {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0078d4', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Accedi</button>
      </form>
    </div>
  );
}