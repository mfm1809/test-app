import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [data, setData] = useState({ messaggio: "Caricamento...", configurazioneUsata: "" });
  const [aziende, setAziende] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Azure mappa automaticamente il backend sotto la rotta /api
    fetch('/api/getSecretData')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Errore:", err));
  }, []);

  useEffect(() => {
    fetch('/api/getDatiAziendali')
      .then(res => res.json())
      .then(data => {
        setAziende(data);
        setLoading(false);
      })
      .catch(err => console.error("Errore:", err));
  }, []);


  return (
    <>
      <section id="center">
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
          <h1>Test Sicurezza Backend Azure</h1>
          <div style={{ padding: '20px', backgroundColor: '#eef', borderRadius: '8px', color: '#333' }}>
            <p><strong>Risposta dal Server:</strong> {data.messaggio}</p>
            <p><strong>Dato Segreto (Letto solo lato server):</strong> {data.configurazioneUsata}</p>
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#222', color: '#fff', borderRadius: '8px', marginTop: '20px' }}>
          <h2 style={{ color: '#fff' }}>Test Variabili d'Ambiente</h2>
          <p><strong>Ambiente:</strong> {import.meta.env.VITE_ENVIRONMENT}</p>
          <p><strong>URL API configurato:</strong> {import.meta.env.VITE_API_URL}</p>
        </div>
      </section>

      <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
        <h1>Dashboard Aziendale Protetta</h1>
        <p style={{ color: '#666' }}>I dati sottostanti passano da un canale cifrato su Azure. URL e Token del middleware sono invisibili.</p>
        
        {loading ? <p>Caricamento dati dal server di Azure...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: '#0078d4', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Nome Azienda Partner</th>
                <th style={{ padding: '12px' }}>Città Sede</th>
              </tr>
            </thead>
            <tbody>
              {aziende.map(az => (
                <tr key={az.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{az.id}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{az.nomeAzienda}</td>
                  <td style={{ padding: '12px' }}>{az.citta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <section id="spacer"></section>
    </>
    
  )
}

export default App
