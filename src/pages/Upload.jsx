import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Icons } from '../components/Icons'

const C = { primary: '#0a0a0a', brandGreen: '#00d4a4', white: '#ffffff', surface: '#f7f7f7', steel: '#5a5a5c', ink: '#0a0a0a', hairline: '#e5e5e5' }

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
        background: C.surface, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{ 
          background: C.white, 
          borderRadius: '12px', 
          padding: '40px', 
          textAlign: 'center', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
          maxWidth: '380px',
          border: `1px solid ${C.hairline}`
        }}>
          <Icons.Lock size={48} color={C.brandGreen} style={{ marginBottom: 16 }} />
          <h2 style={{ color: C.ink, marginBottom: '8px' }}>Anmeldung erforderlich</h2>
          <p style={{ color: C.steel, marginBottom: '24px' }}>
            Bitte melden Sie sich an, um Dokumente hochzuladen.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            style={{ 
              background: C.primary, 
              color: C.white, 
              border: 'none', 
              borderRadius: '9999px', 
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
    <div style={{ minHeight: '100vh', background: C.surface }}>
      <div style={{ 
        background: C.ink, 
        color: C.white, 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Upload size={24} color={C.brandGreen} /> Dokumente hochladen
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
          marginBottom: '32px',
          border: `1px solid ${C.hairline}`
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
              color: C.brandGreen, 
              fontWeight: 700, 
              fontSize: '1.1rem'
            }}>
              {progress}%
            </span>
          </div>
          <div style={{ 
            background: C.hairline, 
            borderRadius: '8px', 
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              background: C.brandGreen, 
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
                  border: `1px solid ${C.hairline}`,
                  borderLeft: `4px solid ${uploaded ? C.brandGreen : C.hairline}`
                }}
              >
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '1.1rem', 
                  color: C.ink,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Icons.FileText size={18} color={C.brandGreen} /> {doc.name}
                </h3>
                <p style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '0.9rem', 
                  color: C.steel,
                  lineHeight: 1.5
                }}>
                  {doc.description}
                </p>

                {uploaded ? (
                  <div style={{ 
                    padding: '12px 16px', 
                    background: C.surface, 
                    borderRadius: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <Icons.Check size={18} color={C.brandGreen} />
                      <span style={{ 
                        fontWeight: 600, 
                        color: C.ink
                      }}>
                        {uploaded.name}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: C.steel,
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
                        color: C.primary,
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
                      border: `2px dashed ${dragging ? C.brandGreen : C.hairline}`,
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
                    <Icons.Upload size={32} color={C.brandGreen} style={{ marginBottom: 8 }} />
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: C.steel,
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
              borderRadius: '9999px',
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