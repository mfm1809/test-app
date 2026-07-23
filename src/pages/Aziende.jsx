import { useEffect, useState } from 'react';

export default function Aziende() {
  const [aziende, setAziende] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Aziendale Protetta</h1>
      {loading ? <p>Caricamento dati da Azure...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ backgroundColor: '#0078d4', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Nome Azienda</th>
              <th style={{ padding: '12px' }}>Città</th>
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
  );
}