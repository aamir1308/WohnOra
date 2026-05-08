import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { appointments } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

export default function Appointments() {
  const { isLoggedIn, user } = useAuthStore()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('list')

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
            Bitte melden Sie sich an, um Ihre Termine zu verwalten.
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

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'upcoming') return true
    if (filter === 'past') return false
    return true
  })

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <div style={{ 
        background: `linear-gradient(135deg, ${C.darkRed}, ${C.navy})`, 
        color: 'white', 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Calendar size={24} color={C.accent} /> Meine Termine
        </h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
          Überblick über deine Besichtigungstermine
        </p>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '32px auto', 
        padding: '0 24px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px', 
          marginBottom: '24px'
        }}>
          <h2 style={{ color: C.primary, margin: 0 }}>
            Termine ({filteredAppointments.length})
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setFilter('all')}
              style={{
                padding: '8px 16px',
                border: filter === 'all' ? `2px solid ${C.primary}` : '1px solid #ddd',
                background: filter === 'all' ? C.primary : C.white,
                color: filter === 'all' ? C.white : C.muted,
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Alle
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              style={{
                padding: '8px 16px',
                border: filter === 'upcoming' ? `2px solid ${C.primary}` : '1px solid #ddd',
                background: filter === 'upcoming' ? C.primary : C.white,
                color: filter === 'upcoming' ? C.white : C.muted,
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Kommend
            </button>
            <button 
              onClick={() => setFilter('past')}
              style={{
                padding: '8px 16px',
                border: filter === 'past' ? `2px solid ${C.primary}` : '1px solid #ddd',
                background: filter === 'past' ? C.primary : C.white,
                color: filter === 'past' ? C.white : C.muted,
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Vergangen
            </button>
          </div>
          <Link 
            to='/appointments' 
            style={{ 
              background: C.primary, 
              color: C.white, 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Icons.Plus size={16} /> Termin buchen
          </Link>
        </div>

        {view === 'list' ? (
          <div style={{ 
            background: C.white, 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            {filteredAppointments.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px 24px', 
                color: C.muted
              }}>
                <Icons.Calendar size={48} color={C.primary} style={{ marginBottom: 16 }} />
                <h3 style={{ color: C.primary, marginBottom: '12px' }}>
                  Keine Termine vorhanden
                </h3>
                <p>
                  Sobald du eine Besichtigung anfragst oder bestätigt bekommst, 
                  erscheinen sie hier.
                </p>
              </div>
            ) : (
              <div>
                {filteredAppointments.map((appointment, index) => {
                  const bgColor = appointment.status === 'confirmed' ? C.cream : 
                                 appointment.status === 'cancelled' ? '#FEE2E2' : '#FEF3C7'
                  const textColor = appointment.status === 'confirmed' ? C.primary : 
                                   appointment.status === 'cancelled' ? '#C62828' : C.muted
                  const statusLabel = appointment.status === 'confirmed' ? 'Bestätigt' : 
                                     appointment.status === 'cancelled' ? 'Abgesagt' : 'Ausstehend'
                  return (
                    <div 
                      key={appointment.id} 
                      style={{ 
                        padding: '16px 20px', 
                        borderBottom: index < filteredAppointments.length - 1 ? '1px solid #eee' : 'none',
                        background: bgColor
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>
                            {appointment.property_title || 'Besichtigungstermin'}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Icons.MapPin size={12} /> {appointment.address || 'Adresse nicht angegeben'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 600, fontSize: '1.2rem', color: C.primary }}>
                              {appointment.date}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                              {appointment.time}
                            </div>
                          </div>
                          <span style={{ 
                            padding: '4px 10px', 
                            borderRadius: '20px', 
                            fontSize: '0.85rem', 
                            fontWeight: 600,
                            background: bgColor,
                            color: textColor,
                            border: `1px solid ${textColor}`
                          }}>
                            {statusLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '64px 24px', 
            background: C.white,
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            <Icons.Calendar size={48} color={C.primary} style={{ marginBottom: 16 }} />
            <h3 style={{ color: C.primary, marginBottom: '12px' }}>
              Kalender-Ansicht
            </h3>
            <p>
              Die Kalender-Ansicht befindet sich derzeit in Entwicklung.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}