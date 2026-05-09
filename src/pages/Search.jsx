import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/mockData'
import PropertyCard from '../components/PropertyCard'
import { Icons } from '../components/Icons'

const C = { primary: '#0a0a0a', brandGreen: '#00d4a4', white: '#ffffff', surface: '#f7f7f7', steel: '#5a5a5c', ink: '#0a0a0a', hairline: '#e5e5e5' }

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(properties)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) {
      setResults(properties)
      return
    }
    
    const lowerQuery = query.toLowerCase()
    const filtered = properties.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.city.toLowerCase().includes(lowerQuery) ||
      p.address.toLowerCase().includes(lowerQuery) ||
      p.postal_code.includes(lowerQuery)
    )
    setResults(filtered)
  }

  return (
    <div style={{ minHeight: '100vh', background: C.surface }}>
      <div style={{ 
        background: C.ink, 
        color: C.white, 
        padding: '24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Search size={24} color={C.brandGreen} /> Immobiliensuche
        </h1>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '32px auto', 
        padding: '0 24px'
      }}>
        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ 
          background: C.white, 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          marginBottom: '32px',
          border: `1px solid ${C.hairline}`
        }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'end' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Suchbegriff (Ort, Straße, PLZ)
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="z.B. Berlin, München, 10115"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${C.hairline}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: C.white
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                background: C.primary,
                color: C.white,
                border: 'none',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                minWidth: '120px',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Icons.Search size={18} /> Suchen
            </button>
            
            <button 
              type="button"
              onClick={() => {
                setQuery('')
                setResults(properties)
              }}
              style={{
                background: 'transparent',
                color: C.steel,
                border: `1px solid ${C.hairline}`,
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Zurücksetzen
            </button>
          </div>
        </form>

        {/* Results Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px'
        }}>
          <h2 style={{ color: C.ink, margin: 0 }}>
            {results.length} Ergebnis{results.length !== 1 ? 'e' : ''}
          </h2>
          <Link 
            to='/properties' 
            style={{ 
              color: C.brandGreen, 
              textDecoration: 'underline',
              fontSize: '0.9rem'
            }}
          >
            Zur erweiterten Suche
          </Link>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '64px 24px', 
            color: C.steel,
            background: C.white,
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            border: `1px solid ${C.hairline}`
          }}>
            <Icons.Search size={48} color={C.brandGreen} style={{ marginBottom: 16 }} />
            <h3 style={{ color: C.ink, marginBottom: '12px' }}>
              Keine Ergebnisse gefunden
            </h3>
            <p>
              Versuche es mit anderen Suchbegriffen oder erweitere deinen Suchradius.
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px'
          }}>
            {results.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}