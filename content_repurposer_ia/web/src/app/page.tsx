'use client'
import {useState} from 'react'
import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

export default function Page(){
  const [file, setFile] = useState<File|null>(null)
  const [resp, setResp] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  async function handle(){
    if(!file) {
      setError('Veuillez sélectionner un fichier vidéo')
      return
    }
    
    setLoading(true)
    setError(null)
    setResp(null)
    
    try {
      const form = new FormData()
      form.append('file', file)
      
      const r = await axios.post(`${api}/transcribe`, form, {
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 300000 // 5 minutes
      })
      
      setResp(r.data)
    } catch (err: any) {
      console.error('Erreur lors de la transcription:', err)
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else if (err.code === 'ECONNABORTED') {
        setError('Timeout - le fichier est trop volumineux ou la connexion est lente')
      } else {
        setError('Erreur lors de la transcription. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <h1>Content Repurposer IA</h1>
      <p>Uploadez une vidéo pour obtenir sa transcription automatique.</p>
      
      <div style={{marginBottom: '1rem'}}>
        <input 
          type='file' 
          accept='video/*' 
          onChange={e => {
            setFile(e.target.files?.[0] || null)
            setError(null)
            setResp(null)
          }}
          disabled={loading}
        />
      </div>
      
      <button 
        onClick={handle}
        disabled={!file || loading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Transcription en cours...' : 'Transcrire'}
      </button>
      
      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00'
        }}>
          <strong>Erreur:</strong> {error}
        </div>
      )}
      
      {resp && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#efe',
          border: '1px solid #cfc',
          borderRadius: '4px'
        }}>
          <h3>Résultat de la transcription:</h3>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
            {JSON.stringify(resp, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{marginTop: '2rem', fontSize: '0.9rem', color: '#666'}}>
        <p><strong>Formats supportés:</strong> MP4, AVI, MOV, WebM</p>
        <p><strong>Taille maximale:</strong> 100 MB</p>
      </div>
    </main>
  )
}