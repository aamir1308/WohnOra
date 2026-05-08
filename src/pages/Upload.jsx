import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

const DOCUMENT_TYPES = [
  { id: 'schufa', name: 'Schufa-Auskunft', description: 'Aktuelle Schufa-Auskunft (nicht älter als 3 Monate)' },
  { id: 'income', name: 'Einkommensnachweis', description: 'Gehaltsabrechnung der letzten 3 Monate' },
  { id: 'id', name: 'Personalausweis', description: 'Kopie des Personalausweises (Vorder- und Rückseite)' },
  { id: 'rent', name: 'Mietschuldenfreiheit', description: 'Bescheinigung über Mietschuldenfreiheit' },
  { id: 'employment', name: 'Arbeitsvertrag', description: 'Kopie des Arbeitsvertrags (falls vorhanden)' },
  { id: 'tax', name: 'Steueridentifikation', description: 'Steuer-Identifikationsnummer' },
]

export default function Upload() {
  const { isLoggedIn, user } = useAuthStore()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [dragging, setDragging] = useState(false)

  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: C.cream, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{ 
          background: C.white, 
          borderRadius: '16px', 
          padding: '40px', 
          textAlign: 'center', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
          maxWidth: '380px'
        }}>
          <Icons.Lock size={48} color={C.primary} style={{ marginBottom: 16 }} />
          <h2 style={{ color: C.primary, marginBottom: '8px' }}>Anmeldung erforderlich</h2>
          <p style={{ color: C.muted, marginBottom: '24px' }}>
            Bitte melden Sie sich an, um Dokumente hochzuladen.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            style={{ 
              background: C.primary, 
              color: C.white, 
              border: 'none', 
              borderRadius: '8px', 
              padding: '12px 32px', 
              fontWeight: 700, 
              cursor: 'pointer', 
              width: '100%'
            }}
          >
            Jetzt anmelden
          </button>
        </div>
      </div>
    )
  }

  const handleFileUpload = (docId, files) => {
    if (files && files.length > 0) {
      const file = files[0]
      setUploadedFiles(prev => ({
        ...prev,
        [docId]: {
          name: file.name,
          size: file.size,
          date: new Date().toLocaleDateString('de-DE'),
          status: 'Hochgeladen'
        }
      }))
    }
  }

  const handleDrop = (e, docId) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files
    handleFileUpload(docId, files)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const uploadedCount = Object.keys(uploadedFiles).length
  const progress = Math.round(uploadedCount / DOCUMENT_TYPES.length * 100)

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <div style={{ 
        background: `linear-gradient(135deg, ${C.darkRed}, ${C.navy})`, 
        color: 'white', 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Upload size={24} color={C.accent} /> Dokumente hochladen
        </h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
          Lade deine Unterlagen für die Bewerbungsmappe hoch
        </p>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '32px auto', 
        padding: '0 24px'
      }}>
        {/* Progress Overview */}
        <div style={{ 
          background: C.white, 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          marginBottom: '32px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '12px'
          }}>
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
              Vollständigkeit der Bewerbungsmappe
            </span>
            <span style={{ 
              color: C.primary, 
              fontWeight: 700, 
              fontSize: '1.1rem'
            }}>
              {progress}%
            </span>
          </div>
          <div style={{ 
            background: '#e0e0e0', 
            borderRadius: '8px', 
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              background: C.primary, 
              borderRadius: '8px', 
              height: '100%', 
              width: `${progress}%`,
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Document List */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '20px'
        }}>
          {DOCUMENT_TYPES.map(doc => {
            const uploaded = uploadedFiles[doc.id]
            return (
              <div 
                key={doc.id}
                style={{ 
                  background: C.white, 
                  borderRadius: '12px', 
                  padding: '24px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  borderLeft: `4px solid ${uploaded ? C.primary : '#ddd'}`
                }}
              >
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '1.1rem', 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Icons.FileText size={18} color={C.primary} /> {doc.name}
                </h3>
                <p style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '0.9rem', 
                  color: '#666',
                  lineHeight: 1.5
                }}>
                  {doc.description}
                </p>

                {uploaded ? (
                  <div style={{ 
                    padding: '12px 16px', 
                    background: C.cream, 
                    borderRadius: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <Icons.Check size={18} color={C.primary} />
                      <span style={{ 
                        fontWeight: 600, 
                        color: C.primary
                      }}>
                        {uploaded.name}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#666',
                      marginLeft: '26px'
                    }}>
                      {formatFileSize(uploaded.size)} • {uploaded.date}
                    </div>
                    <button
                      onClick={() => {
                        const newFiles = {...uploadedFiles}
                        delete newFiles[doc.id]
                        setUploadedFiles(newFiles)
                      }}
                      style={{
                        marginTop: '8px',
                        marginLeft: '26px',
                        background: 'transparent',
                        border: 'none',
                        color: '#C62828',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <Icons.X size={14} /> Entfernen
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => handleDrop(e, doc.id)}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${dragging ? C.primary : '#ddd'}`,
                      borderRadius: '8px',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                      style={{ display: 'none' }}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <Icons.Upload size={32} color={C.primary} style={{ marginBottom: 8 }} />
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#666',
                      marginBottom: '4px'
                    }}>
                      Datei hierher ziehen oder klicken
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                      PDF, JPG, PNG (max. 10MB)
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Submit Button */}
        <div style={{ 
          marginTop: '32px', 
          textAlign: 'center'
        }}>
          <button
            onClick={() => navigate('/seekerdashboard')}
            style={{
              background: C.primary,
              color: C.white,
              border: 'none',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Icons.ArrowLeft size={18} /> Zurück zum Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}