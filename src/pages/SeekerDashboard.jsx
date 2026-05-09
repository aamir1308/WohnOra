import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { properties, appointments, messages } from '../data/mockData'
import PropertyCard from '../components/PropertyCard'
import { Icons } from '../components/Icons'

const C = { primary: '#00d4a4', greenDeep: '#00b48a', primaryDark: '#0a0a0a', white: '#ffffff', surface: '#f7f7f7', hairline: '#e5e5e5', steel: '#5a5a5c', muted: '#888888', onDark: '#ffffff', surfaceSoft: '#fafafa' }

const TABS = [
  { id: 'overview',   label: 'Übersicht' },
  { id: 'saved',      label: 'Gespeichert' },
  { id: 'appointments', label: 'Termine' },
  { id: 'documents',  label: 'Dokumente' },
  { id: 'messages',   label: 'Nachrichten' },
]

const MOCK_SAVED = properties.slice(0, 4)
const MOCK_DOCS = [
  { name: 'Schufa-Auskunft.pdf',    date: '15.01.2026', status: 'Hochgeladen', color: '#00d4a4' },
  { name: 'Einkommensnachweis.pdf', date: '15.01.2026', status: 'Hochgeladen', color: '#00d4a4' },
  { name: 'Personalausweis.pdf',    date: '20.01.2026', status: 'Ausstehend',  color: '#c37d0d' },
  { name: 'Mietschuldenfreiheit.pdf', date: '—',        status: 'Fehlt',      color: '#d45656' },
]

export default function SeekerDashboard() {
  const { isLoggedIn, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: C.white, borderRadius: 16, padding: 40, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: 380 }}>
          <Icons.Lock size={48} color={C.primary} style={{ marginBottom: 16 }} />
          <h2 style={{ color: C.primary, marginBottom: 8 }}>Anmeldung erforderlich</h2>
          <p style={{ color: C.muted, marginBottom: 24 }}>Bitte melden Sie sich an, um Ihr Dashboard zu nutzen.</p>
          <button onClick={() => navigate('/login')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Jetzt anmelden
          </button>
        </div>
      </div>
    )
  }

  const myAppointments = appointments.slice(0, 5)
  const myMessages = messages.slice(0, 5)
  const unreadCount = myMessages.filter(m => !m.read).length

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #1a3d4a 0%, #2d5a4f 100%)', padding: '36px 24px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 4 }}>Suchenden-Dashboard</div>
            <h1 style={{ color: C.white, fontWeight: 900, fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Users size={24} color={C.primary} /> Hallo, {user?.name || user?.email || 'Suchender'}!
            </h1>
          </div>
          <button onClick={() => { logout(); navigate('/') }} style={{
            background: 'rgba(255,255,255,0.15)', color: C.white, border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 14
          }}>
            <Icons.LogOut size={16} style={{ marginRight: 6 }} /> Abmelden
          </button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: C.white, borderBottom: '2px solid #eee', position: 'sticky', top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: 'none', border: 'none', padding: '16px 24px',
              fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? C.primary : C.muted,
              borderBottom: tab === t.id ? `3px solid ${C.primary}` : '3px solid transparent',
              cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6
            }}>
              {t.label}
              {t.id === 'messages' && unreadCount > 0 && (
                <span style={{ background: C.primary, color: C.white, borderRadius: 10, fontSize: 11, padding: '1px 6px', fontWeight: 700 }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 36 }}>
              {[
                { icon: <Icons.Heart size={24} />, val: MOCK_SAVED.length, label: 'Gespeicherte Inserate', color: C.primary },
                { icon: <Icons.Calendar size={24} />, val: myAppointments.length, label: 'Geplante Termine', color: C.primary },
                { icon: <Icons.FileText size={24} />, val: `${MOCK_DOCS.filter(d=>d.status==='Hochgeladen').length}/${MOCK_DOCS.length}`, label: 'Dokumente vollständig', color: C.primaryDark },
                { icon: <Icons.MessageCircle size={24} />, val: unreadCount, label: 'Ungelesene Nachrichten', color: C.steel },
              ].map(s => (
                <div key={s.label} style={{ background: C.white, borderRadius: 12, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `3px solid ${s.color}` }}>
                  <div style={{ marginBottom: 8, color: s.color }}>{s.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: C.muted }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: C.white, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <h3 style={{ color: C.primary, marginBottom: 16, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Calendar size={18} /> Nächste Termine</h3>
              {myAppointments.slice(0, 3).map((a, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.property_title || 'Besichtigung'}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{a.date} · {a.time}</div>
                  </div>
                  <span style={{ background: a.status === 'confirmed' ? C.surfaceSoft : C.surface, color: a.status === 'confirmed' ? C.primary : C.steel, fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                    <Icons.Check size={12} style={{ marginRight: 4 }} /> {a.status === 'confirmed' ? 'Bestätigt' : 'Ausstehend'}
                  </span>
                </div>
              ))}
              <button onClick={() => setTab('appointments')} style={{ background: 'none', border: 'none', color: C.primary, fontWeight: 600, cursor: 'pointer', marginTop: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                Alle Termine ansehen <Icons.ArrowRight size={14} />
              </button>
            </div>

            <div style={{ background: C.white, borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <h3 style={{ color: C.primary, marginBottom: 16, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.FileText size={18} /> Bewerbungsmappe</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {MOCK_DOCS.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: C.surfaceSoft, fontSize: 13 }}>
                    <Icons.Check size={16} color={d.color} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{d.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SAVED */}
        {tab === 'saved' && (
          <div>
            <h2 style={{ color: C.primary, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Heart size={24} /> Gespeicherte Inserate ({MOCK_SAVED.length})</h2>
            {MOCK_SAVED.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: C.muted, background: C.white, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                <Icons.Search size={48} color={C.primary} style={{ marginBottom: 12 }} />
                <p>Noch keine gespeicherten Inserate. Entdecken Sie Immobilien!</p>
                <button onClick={() => navigate('/properties')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
                  Immobilien entdecken
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
                {MOCK_SAVED.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            )}
          </div>
        )}

        {/* APPOINTMENTS */}
        {tab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: C.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Calendar size={24} /> Meine Termine</h2>
              <button onClick={() => navigate('/appointments')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.Plus size={16} /> Termin buchen
              </button>
            </div>
            <div style={{ background: C.white, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: C.surfaceSoft }}>
                    {['Immobilie', 'Datum', 'Uhrzeit', 'Typ', 'Status'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: C.primary }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myAppointments.map((a, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600 }}>{a.property_title || `Besichtigung #${i + 1}`}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: C.muted }}>{a.date}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{a.time}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>Besichtigung</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: a.status === 'confirmed' ? C.surfaceSoft : C.surface, color: a.status === 'confirmed' ? C.primary : C.steel, fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                          <Icons.Check size={12} style={{ marginRight: 4 }} /> {a.status === 'confirmed' ? 'Bestätigt' : 'Ausstehend'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        {tab === 'documents' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: C.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.FileText size={24} /> Bewerbungsmappe</h2>
              <button onClick={() => navigate('/upload')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.Upload size={16} /> Dokument hochladen
              </button>
            </div>
            <div style={{ background: C.white, borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Vollständigkeit der Bewerbungsmappe</span>
                  <span style={{ color: C.primary, fontWeight: 700 }}>{Math.round(MOCK_DOCS.filter(d=>d.status==='Hochgeladen').length / MOCK_DOCS.length * 100)}%</span>
                </div>
                <div style={{ background: '#e0e0e0', borderRadius: 4, height: 8 }}>
                  <div style={{ background: C.primary, borderRadius: 4, height: 8, width: `${MOCK_DOCS.filter(d=>d.status==='Hochgeladen').length / MOCK_DOCS.length * 100}%`, transition: 'width 0.4s' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {MOCK_DOCS.map(doc => (
                <div key={doc.name} style={{ background: C.white, borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${doc.color}` }}>
                  <Icons.FileText size={32} color={doc.color} style={{ marginBottom: 8 }} />
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{doc.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Hochgeladen: {doc.date}</div>
                  <span style={{ background: doc.color + '22', color: doc.color, fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div>
            <h2 style={{ color: C.primary, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.MessageCircle size={24} /> Nachrichten</h2>
            <div style={{ background: C.white, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              {myMessages.map((m, i) => (
                <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 14, alignItems: 'flex-start', background: !m.read ? C.surfaceSoft : C.white }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.primary, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                    {(m.sender_name || 'E').charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: m.read ? 500 : 700, fontSize: 14 }}>{m.sender_name || 'Eigentümer'}</span>
                      <span style={{ fontSize: 12, color: C.muted }}>{m.timestamp}</span>
                    </div>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>{m.property_title}</div>
                    <div style={{ fontSize: 14, color: C.text }}>{m.content}</div>
                  </div>
                  {!m.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary, flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => navigate('/messages')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
                Alle Nachrichten öffnen
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}