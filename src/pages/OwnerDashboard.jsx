import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { properties, appointments, messages } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', text: '#003049', muted: '#666', white: '#fff' }

const TABS = [
  { id: 'overview',  label: 'Übersicht' },
  { id: 'listings',  label: 'Meine Inserate' },
  { id: 'create',    label: 'Inserat erstellen' },
  { id: 'appointments', label: 'Termine' },
  { id: 'messages',  label: 'Nachrichten' },
]

const MY_LISTINGS = properties.slice(0, 5).map(p => ({ ...p, views: Math.floor(Math.random() * 300) + 50, inquiries: Math.floor(Math.random() * 20) + 2 }))

export default function OwnerDashboard() {
  const { isLoggedIn, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  const [form, setForm] = useState({
    title: '', category: 'rent', type: 'apartment', city: '', address: '',
    postal_code: '', price: '', warm_price: '', size_sqm: '', rooms: '',
    floor: '', year_built: '', description: '',
    furnished: false, balcony: false, parking: false, elevator: false, pets_allowed: false, barrier_free: false
  })
  const [formSaved, setFormSaved] = useState(false)

  const handleFormChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }))
  const handleCreateSubmit = (e) => {
    e.preventDefault()
    setFormSaved(true)
    setTimeout(() => setFormSaved(false), 3000)
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  const myMessages = messages.slice(0, 6)
  const unreadCount = myMessages.filter(m => !m.read).length

  const inputStyle = {
    width: '100%', border: '1.5px solid #ddd', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, outline: 'none', background: C.white, boxSizing: 'border-box'
  }
  const labelStyle = { fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 4, display: 'block' }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #DD0000, #000000)', padding: '36px 24px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 4 }}>Eigentümer-Dashboard</div>
            <h1 style={{ color: C.white, fontWeight: 900, fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Home size={24} color={C.accent} /> Willkommen, {user?.name || user?.email || 'Eigentümer'}!
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
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
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

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 36 }}>
              {[
                { icon: <Icons.Building size={24} />, val: MY_LISTINGS.length, label: 'Aktive Inserate', color: C.primary },
                { icon: <Icons.Eye size={24} />, val: MY_LISTINGS.reduce((a,l) => a + l.views, 0), label: 'Gesamt-Aufrufe', color: '#1565C0' },
                { icon: <Icons.Mail size={24} />, val: MY_LISTINGS.reduce((a,l) => a + l.inquiries, 0), label: 'Anfragen gesamt', color: C.accent },
                { icon: <Icons.Calendar size={24} />, val: myAppointments.length, label: 'Termine diese Woche', color: C.black },
              ].map(s => (
                <div key={s.label} style={{ background: C.white, borderRadius: 12, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `3px solid ${s.color}` }}>
                  <div style={{ marginBottom: 8, color: s.color }}>{s.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.val.toLocaleString('de-DE')}</div>
                  <div style={{ fontSize: 13, color: C.muted }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: C.white, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <h3 style={{ color: C.primary, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Building size={20} /> Meine Top-Inserate</h3>
              {MY_LISTINGS.slice(0, 3).map((p, i) => (
                <div key={p.id} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none', alignItems: 'center' }}>
                  <img src={p.image_url} alt={p.title} style={{ width: 72, height: 56, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                    onError={e => { e.target.src = 'https://picsum.photos/seed/ow' + i + '/150/100' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{p.city} · {p.price.toLocaleString('de-DE')} €</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 13 }}>
                    <div style={{ color: C.primary, fontWeight: 700 }}>{p.views} Aufrufe</div>
                    <div style={{ color: C.muted }}>{p.inquiries} Anfragen</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: C.white, borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <h3 style={{ color: C.primary, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.MessageCircle size={20} /> Neue Anfragen</h3>
              {myMessages.slice(0, 3).map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.primary, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                    {(m.sender_name || 'S').charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{m.sender_name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>{m.property_title}</div>
                    <div style={{ fontSize: 13 }}>{m.content?.substring(0, 80)}…</div>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, flexShrink: 0 }}>{m.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LISTINGS */}
        {tab === 'listings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: C.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Building size={24} /> Meine Inserate ({MY_LISTINGS.length})</h2>
              <button onClick={() => setTab('create')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.Plus size={16} /> Neues Inserat
              </button>
            </div>
            <div style={{ background: C.white, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#FFF5F5' }}>
                    {['Immobilie', 'Typ', 'Preis', 'Aufrufe', 'Anfragen', 'Status', ''].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: C.primary }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MY_LISTINGS.map((p, i) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img src={p.image_url} alt='' style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6 }}
                            onError={e => { e.target.src = 'https://picsum.photos/seed/lt' + i + '/100/75' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title}</div>
                            <div style={{ fontSize: 11, color: C.muted }}>{p.city}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{p.type}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: C.primary }}>
                        {p.price.toLocaleString('de-DE')} €
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{p.views}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{p.inquiries}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: '#FFF5F5', color: C.primary, fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Aktiv</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => navigate('/propertydetail/' + p.id)} style={{ background: C.white, border: `1px solid ${C.primary}`, color: C.primary, borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                          Ansehen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CREATE */}
        {tab === 'create' && (
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ color: C.primary, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Plus size={24} /> Neues Inserat erstellen</h2>
            {formSaved && (
              <div style={{ background: '#FFF5F5', border: '1px solid #FFCC00', borderRadius: 10, padding: '14px 20px', marginBottom: 20, color: C.primary, fontWeight: 600 }}>
                <Icons.Check size={18} style={{ marginRight: 8 }} /> Inserat erfolgreich erstellt! Es wird nach Prüfung veröffentlicht.
              </div>
            )}
            <form onSubmit={handleCreateSubmit} style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Kategorie *</label>
                  <select value={form.category} onChange={e => handleFormChange('category', e.target.value)} style={inputStyle} required>
                    <option value='rent'>Zur Miete</option>
                    <option value='buy'>Zum Kauf</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Immobilientyp *</label>
                  <select value={form.type} onChange={e => handleFormChange('type', e.target.value)} style={inputStyle} required>
                    <option value='apartment'>Wohnung</option>
                    <option value='house'>Haus</option>
                    <option value='studio'>Studio</option>
                    <option value='penthouse'>Penthouse</option>
                    <option value='duplex'>Maisonette</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Titel *</label>
                <input value={form.title} onChange={e => handleFormChange('title', e.target.value)}
                  placeholder='z.B. Helle 3-Zimmer-Wohnung in München Schwabing' style={inputStyle} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Straße & Hausnummer *</label>
                  <input value={form.address} onChange={e => handleFormChange('address', e.target.value)}
                    placeholder='Musterstraße 1' style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Stadt *</label>
                  <input value={form.city} onChange={e => handleFormChange('city', e.target.value)}
                    placeholder='München' style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>PLZ *</label>
                  <input value={form.postal_code} onChange={e => handleFormChange('postal_code', e.target.value)}
                    placeholder='80331' style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>{form.category === 'rent' ? 'Kaltmiete (€/Mon.) *' : 'Kaufpreis (€) *'}</label>
                  <input value={form.price} onChange={e => handleFormChange('price', e.target.value)}
                    type='number' placeholder='1200' style={inputStyle} required />
                </div>
                {form.category === 'rent' && (
                  <div>
                    <label style={labelStyle}>Warmmiete (€/Mon.)</label>
                    <input value={form.warm_price} onChange={e => handleFormChange('warm_price', e.target.value)}
                      type='number' placeholder='1450' style={inputStyle} />
                  </div>
                )}
                <div>
                  <label style={labelStyle}>Fläche (m²) *</label>
                  <input value={form.size_sqm} onChange={e => handleFormChange('size_sqm', e.target.value)}
                    type='number' placeholder='75' style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Zimmer *</label>
                  <input value={form.rooms} onChange={e => handleFormChange('rooms', e.target.value)}
                    type='number' placeholder='3' style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Etage</label>
                  <input value={form.floor} onChange={e => handleFormChange('floor', e.target.value)}
                    type='number' placeholder='2' style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Baujahr</label>
                  <input value={form.year_built} onChange={e => handleFormChange('year_built', e.target.value)}
                    type='number' placeholder='1990' style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Beschreibung</label>
                <textarea value={form.description} onChange={e => handleFormChange('description', e.target.value)}
                  placeholder='Beschreiben Sie Ihre Immobilie...' rows={5}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Ausstattung</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 8 }}>
                  {[
                    ['furnished', 'Möbliert'],
                    ['balcony', 'Balkon/Terrasse'],
                    ['parking', 'Stellplatz'],
                    ['elevator', 'Aufzug'],
                    ['pets_allowed', 'Haustiere'],
                    ['barrier_free', 'Barrierefrei'],
                  ].map(([key, lbl]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, background: form[key] ? '#FFF5F5' : '#f9f9f9', borderRadius: 8, padding: '8px 12px', border: `1px solid ${form[key] ? C.primary : '#e0e0e0'}` }}>
                      <input type='checkbox' checked={form[key]} onChange={e => handleFormChange(key, e.target.checked)} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>
              <button type='submit' style={{
                width: '100%', background: C.primary, color: C.white, border: 'none',
                borderRadius: 8, padding: '14px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer'
              }}>
                Inserat veröffentlichen <Icons.ArrowRight size={18} style={{ marginLeft: 8 }} />
              </button>
            </form>
          </div>
        )}

        {/* APPOINTMENTS */}
        {tab === 'appointments' && (
          <div>
            <h2 style={{ color: C.primary, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Calendar size={24} /> Besichtigungstermine</h2>
            <div style={{ background: C.white, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#FFF5F5' }}>
                    {['Interessent', 'Immobilie', 'Datum', 'Uhrzeit', 'Status', 'Aktion'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: C.primary }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myAppointments.map((a, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 14 }}>{a.seeker_name || `Interessent ${i + 1}`}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: C.muted }}>{a.property_title || 'Meine Wohnung'}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{a.date}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{a.time}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: a.status === 'confirmed' ? '#FFF5F5' : '#FFF8F0', color: a.status === 'confirmed' ? C.primary : C.accent, fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                          <Icons.Check size={12} style={{ marginRight: 4 }} /> {a.status === 'confirmed' ? 'Bestätigt' : 'Ausstehend'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {a.status !== 'confirmed' && (
                          <button style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                            Bestätigen
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div>
            <h2 style={{ color: C.primary, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.MessageCircle size={24} /> Mieteranfragen</h2>
            <div style={{ background: C.white, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              {myMessages.map((m, i) => (
                <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 14, background: !m.read ? '#FFF5F5' : C.white }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.primary, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                    {(m.sender_name || 'S').charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontWeight: m.read ? 500 : 700 }}>{m.sender_name}</span>
                      <span style={{ fontSize: 12, color: C.muted }}>{m.timestamp}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Re: {m.property_title}</div>
                    <div style={{ fontSize: 13 }}>{m.content}</div>
                    <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                      <button onClick={() => navigate('/messages')} style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 6, padding: '4px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                        Antworten
                      </button>
                    </div>
                  </div>
                  {!m.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary, flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}