import React, { useState, useMemo } from 'react'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

const initFilters = {
  category: '', type: [], minPrice: '', maxPrice: '',
  minSqm: '', rooms: '', furnished: false, balcony: false,
  parking: false, elevator: false, pets: false, availableFrom: '',
  energyClass: '', minYear: '', maxYear: '', floor: '', barrierFree: false
}

export default function Properties() {
  const [filters, setFilters] = useState(initFilters)
  const [applied, setApplied] = useState(initFilters)
  const [sort, setSort] = useState('default')
  const [advOpen, setAdvOpen] = useState(false)

  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }))
  const toggleType = t => setFilters(f => ({
    ...f, type: f.type.includes(t) ? f.type.filter(x=>x!==t) : [...f.type, t]
  }))

  const filtered = useMemo(() => {
    let list = properties.filter(p => {
      if (applied.category && p.category !== applied.category) return false
      if (applied.type.length && !applied.type.includes(p.type)) return false
      if (applied.minPrice && p.price < +applied.minPrice) return false
      if (applied.maxPrice && p.price > +applied.maxPrice) return false
      if (applied.minSqm && p.size_sqm < +applied.minSqm) return false
      if (applied.rooms && p.rooms < +applied.rooms) return false
      if (applied.furnished && !p.furnished) return false
      if (applied.balcony && !p.balcony) return false
      if (applied.parking && !p.parking) return false
      if (applied.elevator && !p.elevator) return false
      if (applied.pets && !p.pets_allowed) return false
      if (applied.barrierFree && !p.barrier_free) return false
      if (applied.energyClass && p.energy_class !== applied.energyClass) return false
      if (applied.minYear && p.construction_year < +applied.minYear) return false
      if (applied.maxYear && p.construction_year > +applied.maxYear) return false
      if (applied.floor && p.floor < +applied.floor) return false
      return true
    })
    if (sort === 'price-asc') list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price)
    if (sort === 'sqm-desc') list = [...list].sort((a,b) => b.size_sqm - a.size_sqm)
    return list
  }, [applied, sort])

  const Check = ({ label, k }) => (
    <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14 }}>
      <input type='checkbox' checked={filters[k]} onChange={e => setF(k, e.target.checked)} />
      {label}
    </label>
  )

  return (
    <div style={{ display:'flex', minHeight:'100vh', background: C.cream }}>

      <aside style={{
        width:280, flexShrink:0, background:'#fff', padding:'24px 20px',
        borderRight:'1px solid #e0e0e0', overflowY:'auto', position:'sticky', top:64, height:'calc(100vh - 64px)'
      }}>
        <h2 style={{ fontSize:18, fontWeight:800, color: C.primary, marginBottom:20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Search size={20} /> Filter</h2>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:10, fontSize:13, color:C.navy, textTransform:'uppercase', letterSpacing:0.5 }}>Kategorie</div>
          {[['','Alle'],['rent','Mieten'],['buy','Kaufen']].map(([val,lbl]) => (
            <label key={val} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, cursor:'pointer', fontSize:14 }}>
              <input type='radio' name='cat' value={val} checked={filters.category===val} onChange={() => setF('category',val)} />
              {lbl}
            </label>
          ))}
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:10, fontSize:13, color:C.navy, textTransform:'uppercase', letterSpacing:0.5 }}>Objekttyp</div>
          {[['apartment','Wohnung'],['house','Haus'],['studio','Studio'],['penthouse','Penthouse'],['duplex','Maisonette']].map(([val,lbl]) => (
            <label key={val} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, cursor:'pointer', fontSize:14 }}>
              <input type='checkbox' checked={filters.type.includes(val)} onChange={() => toggleType(val)} />
              {lbl}
            </label>
          ))}
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:10, fontSize:13, color:C.navy, textTransform:'uppercase', letterSpacing:0.5 }}>Preis (€)</div>
          <div style={{ display:'flex', gap:8 }}>
            <input type='number' placeholder='Min' value={filters.minPrice} onChange={e=>setF('minPrice',e.target.value)}
              style={{ width:'100%', border:'1px solid #ddd', borderRadius:6, padding:'8px 10px', fontSize:13 }} />
            <input type='number' placeholder='Max' value={filters.maxPrice} onChange={e=>setF('maxPrice',e.target.value)}
              style={{ width:'100%', border:'1px solid #ddd', borderRadius:6, padding:'8px 10px', fontSize:13 }} />
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:10, fontSize:13, color:C.navy, textTransform:'uppercase', letterSpacing:0.5 }}>Fläche ab (m²)</div>
          <input type='number' placeholder='z.B. 50' value={filters.minSqm} onChange={e=>setF('minSqm',e.target.value)}
            style={{ width:'100%', border:'1px solid #ddd', borderRadius:6, padding:'8px 10px', fontSize:13 }} />
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:10, fontSize:13, color:C.navy, textTransform:'uppercase', letterSpacing:0.5 }}>Zimmer (mind.)</div>
          <div style={{ display:'flex', gap:6 }}>
            {['','1','2','3','4','5'].map(r => (
              <button key={r} onClick={() => setF('rooms',r)} style={{
                flex:1, padding:'6px 0', border:`1px solid ${filters.rooms===r ? C.primary : '#ddd'}`,
                borderRadius:6, background: filters.rooms===r ? C.primary : '#fff',
                color: filters.rooms===r ? '#fff' : C.navy, fontSize:13, cursor:'pointer'
              }}>{r||'Alle'}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:10, fontSize:13, color:C.navy, textTransform:'uppercase', letterSpacing:0.5 }}>Ausstattung</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <Check label='Möbliert' k='furnished' />
            <Check label='Balkon / Terrasse' k='balcony' />
            <Check label='Parkplatz' k='parking' />
            <Check label='Aufzug' k='elevator' />
            <Check label='Haustiere erlaubt' k='pets' />
          </div>
        </div>

        <button onClick={() => setAdvOpen(!advOpen)} style={{
          width:'100%', background:'transparent', border:`1px solid ${C.primary}`, color: C.primary,
          padding:'8px', borderRadius:6, fontWeight:600, fontSize:13, cursor:'pointer', marginBottom: advOpen ? 16 : 0
        }}>
          {advOpen ? '▲ Weniger Filter' : '▼ Erweiterte Filter'}
        </button>
        {advOpen && (
          <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:16 }}>
            <div>
              <div style={{ fontWeight:600, fontSize:13, marginBottom:6 }}>Energieklasse</div>
              <select value={filters.energyClass} onChange={e=>setF('energyClass',e.target.value)}
                style={{ width:'100%', border:'1px solid #ddd', borderRadius:6, padding:'8px', fontSize:13, background:'#fff' }}>
                <option value=''>Alle</option>
                {['A+','A','B','C','D','E','F','G'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Check label='Barrierefrei' k='barrierFree' />
          </div>
        )}

        <div style={{ display:'flex', gap:8, marginTop:24 }}>
          <button onClick={() => setApplied(filters)} style={{
            flex:2, background: C.primary, color:'#fff', border:'none', borderRadius:8,
            padding:'12px', fontWeight:700, cursor:'pointer', fontSize:14
          }}>Filter anwenden</button>
          <button onClick={() => { setFilters(initFilters); setApplied(initFilters) }} style={{
            flex:1, background:'transparent', border:'1px solid #ccc', color:C.navy,
            borderRadius:8, padding:'12px', cursor:'pointer', fontSize:13
          }}>Reset</button>
        </div>
      </aside>

      <main style={{ flex:1, padding:'28px 28px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:800, color: C.primary }}>Immobilien</h1>
            <p style={{ color: C.muted, fontSize:14, marginTop:4 }}>{filtered.length} Objekte gefunden</p>
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            style={{ border:'1px solid #ddd', borderRadius:8, padding:'8px 14px', fontSize:14, background:'#fff', cursor:'pointer' }}>
            <option value='default'>Sortierung: Standard</option>
            <option value='price-asc'>Preis: aufsteigend</option>
            <option value='price-desc'>Preis: absteigend</option>
            <option value='sqm-desc'>Fläche: größte zuerst</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 24px', color: C.muted }}>
            <div style={{ marginBottom:16 }}>
            <Icons.Building size={48} color={C.primary} />
          </div>
            <h3 style={{ fontSize:20, marginBottom:8, color: C.primary }}>Keine Treffer</h3>
            <p>Bitte passen Sie Ihre Filtereinstellungen an.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </main>
    </div>
  )
}