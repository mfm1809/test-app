import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
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
