import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { properties, amenities, germanBanks } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#0a0a0a', brandGreen: '#00d4a4', white: '#ffffff', surface: '#f7f7f7', steel: '#5a5a5c', ink: '#0a0a0a', hairline: '#e5e5e5' }

const fmt = n => n ? new Intl.NumberFormat('de-DE').format(n) : ''

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const p = properties.find(x => x.id === +id)

  const [activeImg, setActiveImg] = useState(0)
  const [form, setForm] = useState({ name:'', email:'', phone:'', employment:'', income:'', moveIn:'', notes:'' })
  const [submitted, setSubmitted] = useState(false)

  if (!p) return (
    <div style={{ textAlign:'center', padding:'100px 24px' }}>
      <h2 style={{ color: C.primary }}>Immobilie nicht gefunden</h2>
      <button onClick={() => navigate('/properties')} style={{ marginTop:16, background: C.primary, color:'#fff', border:'none', padding:'10px 24px', borderRadius:8, cursor:'pointer' }}>
        Zurück zur Suche
      </button>
    </div>
  )

  const images = [
    p.image_url,
    p.image_url_2,
    p.image_url_3,
    p.image_url_4,
  ]
  const isRent = p.category === 'rent'
  const typeLabels = { apartment:'Wohnung', house:'Haus', studio:'Studio', penthouse:'Penthouse', duplex:'Maisonette' }
  const energyColors = { 'A+':'#1B5E20','A':'#2E7D32','B':'#558B2F','C':'#F9A825','D':'#F57F17','E':'#E65100','F':'#BF360C','G':'#880E4F' }
  const nearbyAmenities = amenities.slice(0, 6)

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: C.cream, minHeight:'100vh' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize:13, color: C.muted, marginBottom:20, display:'flex', gap:8, alignItems:'center' }}>
          <Link to='/' style={{ color: C.primary }}>Start</Link> /
          <Link to='/properties' style={{ color: C.primary }}>Immobilien</Link> /
          <span>{p.title}</span>
        </div>

        {/* ── IMAGE GALLERY ── */}
        <div style={{ marginBottom:36 }}>
          <img src={images[activeImg]} alt={p.title}
            style={{ width:'100%', height:460, objectFit:'cover', borderRadius:16, boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}
            onError={e => e.target.src='https://picsum.photos/seed/fallback/800/500'} />
          <div style={{ display:'flex', gap:12, marginTop:12 }}>
            {images.map((img,i) => (
              <img key={i} src={img} alt='' onClick={() => setActiveImg(i)}
                style={{ width:130, height:86, objectFit:'cover', borderRadius:8, cursor:'pointer',
                  border: activeImg===i ? `3px solid ${C.accent}` : '3px solid transparent',
                  opacity: activeImg===i ? 1 : 0.7, transition:'all 0.2s' }}
                onError={e => e.target.src='https://picsum.photos/seed/fallback/800/500'} />
            ))}
          </div>
        </div>

        {/* ── TWO COLUMN ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:32 }}>

          {/* LEFT */}
          <div>
            {/* Title & badges */}
            <div style={{ display:'flex', gap:10, marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ background: isRent ? C.primary : C.accent, color:'#fff', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>
                {isRent ? 'MIETEN' : 'KAUFEN'}
              </span>
              <span style={{ background:'#E8F5E9', color: C.primary, padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:600 }}>
                {typeLabels[p.type] || p.type}
              </span>
              {p.barrier_free && <span style={{ background:'#E3F2FD', color:'#1565C0', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:600 }}>Barrierefrei</span>}
            </div>
            <h1 style={{ fontSize:'1.8rem', fontWeight:900, color: C.primary, marginBottom:8, lineHeight:1.2 }}>{p.title}</h1>
            <p style={{ color: C.muted, fontSize:15, marginBottom:24 }}><Icons.MapPin size={16} style={{ marginRight: 4 }} /> {p.address}</p>

            {/* Key facts grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:32 }}>
              {[
                { icon: <Icons.Maximize size={20} />, label:'Wohnfläche', val:`${p.size_sqm} m²` },
                { icon: <Icons.Bed size={20} />, label:'Zimmer', val:p.rooms },
                { icon: <Icons.Building size={20} />, label:'Etage', val: p.floor === 0 ? 'Erdgeschoss' : `${p.floor}. OG` },
                { icon: <Icons.Hammer size={20} />, label:'Baujahr', val: p.construction_year },
                { icon: <Icons.Zap size={20} />, label:'Energieklasse', val: p.energy_class },
                { icon: <Icons.Calendar size={20} />, label:'Verfügbar ab', val: new Date(p.available_from).toLocaleDateString('de-DE') },
              ].map((f,i) => (
                <div key={i} style={{ background: C.card, borderRadius:10, padding:16, textAlign:'center', boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
                  <div style={{ marginBottom:6, display:'flex', justifyContent:'center' }}>{f.icon}</div>
                  <div style={{ fontSize:12, color: C.muted, marginBottom:4 }}>{f.label}</div>
                  <div style={{ fontWeight:700, fontSize:15, color:
                    f.label==='Energieklasse' ? energyColors[f.val] || C.primary : C.primary
                  }}>{f.val}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ background: C.card, borderRadius:12, padding:24, marginBottom:24, boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontWeight:800, color: C.primary, marginBottom:12 }}>Beschreibung</h3>
              <p style={{ color:'#333', lineHeight:1.8, fontSize:15 }}>{p.description}</p>
              <p style={{ color:'#444', lineHeight:1.8, fontSize:14, marginTop:12 }}>
                Die Immobilie befindet sich in {p.city} ({p.postal_code}) und bietet hervorragende Verkehrsanbindung sowie alle notwendigen Einrichtungen des täglichen Bedarfs in der unmittelbaren Umgebung. Das Objekt eignet sich ideal für {p.rooms <= 2 ? 'Singles und Paare' : 'Familien und größere Haushalte'}.
              </p>
            </div>

            {/* Features */}
            <div style={{ background: C.card, borderRadius:12, padding:24, marginBottom:24, boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontWeight:800, color: C.primary, marginBottom:16 }}>Ausstattungsmerkmale</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
                {[
                  [p.furnished, 'Möbliert'],
                  [p.balcony, 'Balkon / Terrasse'],
                  [p.parking, 'Parkplatz'],
                  [p.elevator, 'Aufzug'],
                  [p.pets_allowed, 'Haustiere erlaubt'],
                  [p.barrier_free, 'Barrierefrei'],
                  [true, `Energieklasse ${p.energy_class}`],
                ].filter(([ok]) => ok).map(([, lbl]) => (
                  <span key={lbl} style={{ background:'#E8F5E9', color: C.primary, padding:'6px 14px', borderRadius:20, fontSize:13, fontWeight:600 }}>
                    {lbl}
                  </span>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ background: C.card, borderRadius:12, padding:24, marginBottom:24, boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontWeight:800, color: C.primary, marginBottom:12 }}>Lage auf der Karte</h3>
              <div style={{ background: C.bg, borderRadius:10, border:`2px dashed ${C.primary}`, height:220, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color: C.muted }}>
                <Icons.Map size={40} color={C.primary} style={{ marginBottom:12 }} />
                <p style={{ fontWeight:600, marginBottom:4 }}>{p.address}</p>
                <p style={{ fontSize:14 }}>Kartenansicht in Vorbereitung</p>
              </div>
            </div>

            {/* Nearby amenities */}
            <div style={{ background: C.card, borderRadius:12, padding:24, marginBottom:24, boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontWeight:800, color: C.primary, marginBottom:16 }}>In der Nähe</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
                {nearbyAmenities.map(a => (
                  <div key={a.id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ fontSize:'1.4rem' }}>{a.icon}</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14 }}>{a.name}</div>
                      <div style={{ fontSize:12, color: C.muted }}>{a.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {/* Price & contact */}
            <div style={{ background: C.card, borderRadius:12, padding:24, marginBottom:24, boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize:28, fontWeight:900, color: C.primary, marginBottom:8 }}>
                {isRent ? `${fmt(p.price)} €` : `${fmt(p.price)} €`}
                <span style={{ fontSize:14, fontWeight:500, color: C.muted, marginLeft:4 }}>
                  {isRent ? ' / Monat' : ' Kaufpreis'}
                </span>
              </div>
              <div style={{ fontSize:13, color: C.muted, marginBottom:20 }}>
                {isRent ? 'Kaltmiete' : 'Inkl. Maklerprovision'}
              </div>

              {submitted ? (
                <div style={{ background:'#E8F5E9', borderRadius:10, padding:20, textAlign:'center' }}>
                  <Icons.CheckCircle size={32} color={C.primary} style={{ marginBottom:12 }} />
                  <h3 style={{ fontWeight:800, color: C.primary, marginBottom:8 }}>Anfrage gesendet!</h3>
                  <p style={{ fontSize:14, color:'#333', marginBottom:16 }}>
                    Wir haben Ihre Besichtigungsanfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{
                    background: C.accent, color:'#fff', border:'none', borderRadius:8, padding:'10px 20px', fontSize:14, fontWeight:600, cursor:'pointer'
                  }}>
                    Neue Anfrage
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type='text' placeholder='Ihr Name' value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required
                    style={{ width:'100%', border:'1px solid #ddd', borderRadius:8, padding:'10px 14px', marginBottom:10, fontSize:14, boxSizing:'border-box' }} />
                  <input type='email' placeholder='E-Mail-Adresse' value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required
                    style={{ width:'100%', border:'1px solid #ddd', borderRadius:8, padding:'10px 14px', marginBottom:10, fontSize:14, boxSizing:'border-box' }} />
                  <input type='tel' placeholder='Telefonnummer' value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} required
                    style={{ width:'100%', border:'1px solid #ddd', borderRadius:8, padding:'10px 14px', marginBottom:10, fontSize:14, boxSizing:'border-box' }} />
                  <select value={form.employment} onChange={e=>setForm(f=>({...f,employment:e.target.value}))} required
                    style={{ width:'100%', border:'1px solid #ddd', borderRadius:8, padding:'10px 14px', marginBottom:10, fontSize:14, background:'#fff', boxSizing:'border-box' }}>
                    <option value=''>Beschäftigungsstatus</option>
                    {['Angestellt','Selbstständig','Beamter','Rentner','Student'].map(o=><option key={o}>{o}</option>)}
                  </select>
                  <select value={form.income} onChange={e=>setForm(f=>({...f,income:e.target.value}))} required
                    style={{ width:'100%', border:'1px solid #ddd', borderRadius:8, padding:'10px 14px', marginBottom:10, fontSize:14, background:'#fff', boxSizing:'border-box' }}>
                    <option value=''>Einkommensklasse</option>
                    {['Unter 1.500 €','1.500 – 3.000 €','3.000 – 5.000 €','Über 5.000 €'].map(o=><option key={o}>{o}</option>)}
                  </select>
                  <label style={{ fontSize:13, color:'#555', display:'block', marginBottom:6 }}>Gewünschter Einzug</label>
                  <input type='date' value={form.moveIn} onChange={e=>setForm(f=>({...f,moveIn:e.target.value}))} required
                    style={{ width:'100%', border:'1px solid #ddd', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:14, boxSizing:'border-box' }} />
                  <button type='submit' style={{
                    width:'100%', background: C.accent, color:'#fff', border:'none',
                    borderRadius:10, padding:'14px', fontSize:16, fontWeight:700, cursor:'pointer'
                  }}>
                    <Icons.Calendar size={16} style={{ marginRight: 6 }} /> Besichtigung anfragen
                  </button>
                  <p style={{ textAlign:'center', fontSize:12, color: C.muted, marginTop:10 }}>
                    OTP-Verifizierung per E-Mail · Kostenlos & unverbindlich
                  </p>
                </form>
              )}
            </div>

            {/* Banks */}
            <div style={{ background: C.card, borderRadius:12, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontWeight:700, color: C.primary, marginBottom:14, fontSize:15 }}>Finanzierungspartner</h3>
              {germanBanks.slice(0,3).map(b => (
                <div key={b.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #f0f0f0' }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:13 }}>{b.name}</div>
                    <div style={{ fontSize:11, color: C.muted }}>Baufinanzierung</div>
                  </div>
                  <a href={b.website} target='_blank' rel='noreferrer' style={{
                    background: C.primary, color:'#fff', padding:'5px 12px', borderRadius:6, fontSize:12, fontWeight:600
                  }}>Info →</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}