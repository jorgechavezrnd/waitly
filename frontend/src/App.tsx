import { useState, type FormEvent } from 'react'
import './App.css'

type Status = 'idle' | 'loading' | 'success' | 'error'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const raw = await response.text()
      let data: { error?: string } = {}
      try {
        data = raw ? JSON.parse(raw) : {}
      } catch {
        throw new Error('El servidor respondió con un formato inesperado.')
      }

      if (!response.ok) {
        throw new Error(data.error ?? 'Algo salió mal, intenta de nuevo.')
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Algo salió mal, intenta de nuevo.',
      )
    }
  }

  const isLoading = status === 'loading'

  return (
    <main className="card">
      <span className="badge">Curso de Cloudflare Workers · Platzi</span>
      <h1>Waitly</h1>
      <p className="subtitle">
        Únete a la lista de espera y sé de los primeros en probar lo que
        estamos construyendo con Cloudflare Workers.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
          className="input"
        />
        <button type="submit" disabled={isLoading} className="button">
          {isLoading ? 'Enviando...' : 'Unirme a la waitlist'}
        </button>
      </form>

      {status === 'success' && (
        <p className="feedback success">
          ¡Listo! Te avisaremos apenas tengamos noticias. 🎉
        </p>
      )}

      {status === 'error' && <p className="feedback error">{errorMessage}</p>}
    </main>
  )
}

export default App
