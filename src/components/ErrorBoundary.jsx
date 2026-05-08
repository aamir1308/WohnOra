import React, { Component } from 'react'
import { Icons } from './Icons'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8F9FA',
          padding: '24px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
          }}>
            <Icons.AlertTriangle size={64} color="#C62828" style={{ marginBottom: 16 }} />
            <h1 style={{ color: '#C62828', marginBottom: '16px', fontSize: '1.8rem' }}>
              Etwas ist schief gelaufen
            </h1>
            <p style={{ color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>
              Entschuldigung, es ist ein unerwarteter Fehler aufgetreten. 
              Bitte versuchen Sie die Seite neu zu laden.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#1B5E20',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                marginRight: '12px'
              }}
            >
              Seite neu laden
            </button>
            <button
              onClick={() => window.history.back()}
              style={{
                background: 'transparent',
                color: '#666',
                border: '1px solid #ddd',
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Zurück
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '24px', 
                textAlign: 'left', 
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                  Fehlerdetails (Entwicklung)
                </summary>
                <pre style={{ 
                  marginTop: '12px', 
                  overflow: 'auto',
                  color: '#C62828'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary