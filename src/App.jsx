import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [data, setData] = useState({ messaggio: "Caricamento...", configurazioneUsata: "" });

  useEffect(() => {
    // Azure mappa automaticamente il backend sotto la rotta /api
    fetch('/api/getSecretData')
      .then(res => res.json())
      .then(data => setData(data))
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

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
