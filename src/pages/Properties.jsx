import React, { useState, useMemo } from 'react'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = {
  primary: '#0a0a0a',
  brandGreen: '#00d4a4',
  white: '#ffffff',
  surface: '#f7f7f7',
  steel: '#5a5a5c',
  ink: '#0a0a0a',
  hairline: '#e5e5e5'
}

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
    <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, color: C.ink }}>
      <input type='checkbox' checked={filters[k]} onChange={e => setF(k, e.target.checked)} />
      {label}
    </label>
  )

  return (
    <div style={{ display:'flex', minHeight:'100vh', background: C.surface }}>

      <aside style={{
        width:280, flexShrink:0, background: C.white, padding:'24px 20px',
        borderRight:`1px solid ${C.hairline}`, overflowY:'auto', position:'sticky', top:64, height:'calc(100vh - 64px)'
      }}>
        <h2 style={{ fontSize:18, fontWeight:600, color: C.ink, marginBottom:24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Search size={20} /> Filter
        </h2>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:600, marginBottom:10, fontSize:13, color:C.steel, textTransform:'uppercase', letterSpacing:0.5 }}>Kategorie</div>
          {[['','Alle'],['rent','Mieten'],['buy','Kaufen']].map(([val,lbl]) => (
            <label key={val} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, cursor:'pointer', fontSize:14, color: C.ink }}>
              <input type='radio' name='cat' value={val} checked={filters.category===val} onChange={() => setF('category',val)} />
              {lbl}
            </label>
          ))}
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:600, marginBottom:10, fontSize:13, color:C.steel, textTransform:'uppercase', letterSpacing:0.5 }}>Objekttyp</div>
          {[['apartment','Wohnung'],['house','Haus'],['studio','Studio'],['penthouse','Penthouse'],['duplex','Maisonette']].map(([val,lbl]) => (
            <label key={val} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, cursor:'pointer', fontSize:14, color: C.ink }}>
              <input type='checkbox' checked={filters.type.includes(val)} onChange={() => toggleType(val)} />
              {lbl}
            </label>
          ))}
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:600, marginBottom:10, fontSize:13, color:C.steel, textTransform:'uppercase', letterSpacing:0.5 }}>Preis (€)</div>
          <div style={{ display:'flex', gap:8 }}>
            <input className='input' type='number' placeholder='Min' value={filters.minPrice} onChange={e=>setF('minPrice',e.target.value)} />
            <input className='input' type='number' placeholder='Max' value={filters.maxPrice} onChange={e=>setF('maxPrice',e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:600, marginBottom:10, fontSize:13, color:C.steel, textTransform:'uppercase', letterSpacing:0.5 }}>Fläche ab (m²)</div>
          <input className='input' type='number' placeholder='z.B. 50' value={filters.minSqm} onChange={e=>setF('minSqm',e.target.value)} />
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:600, marginBottom:10, fontSize:13, color:C.steel, textTransform:'uppercase', letterSpacing:0.5 }}>Zimmer (mind.)</div>
          <div style={{ display:'flex', gap:6 }}>
            {['','1','2','3','4','5'].map(r => (
              <button key={r} onClick={() => setF('rooms',r)} style={{
                flex:1, padding:'8px 0', border:`1px solid ${filters.rooms===r ? C.brandGreen : C.hairline}`,
                borderRadius:6, background: filters.rooms===r ? C.brandGreen : C.white,
                color: filters.rooms===r ? C.primary : C.ink, fontSize:13, cursor:'pointer', fontWeight: filters.rooms===r ? 600 : 400
              }}>{r||'Alle'}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:600, marginBottom:10, fontSize:13, color:C.steel, textTransform:'uppercase', letterSpacing:0.5 }}>Ausstattung</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Check label='Möbliert' k='furnished' />
            <Check label='Balkon / Terrasse' k='balcony' />
            <Check label='Parkplatz' k='parking' />
            <Check label='Aufzug' k='elevator' />
            <Check label='Haustiere erlaubt' k='pets' />
          </div>
        </div>

        <button onClick={() => setAdvOpen(!advOpen)} className='btn-secondary' style={{
          width:'100%', padding:'10px', fontSize:13, marginBottom: advOpen ? 16 : 0
        }}>
          {advOpen ? '▲ Weniger Filter' : '▼ Erweiterte Filter'}
        </button>
        {advOpen && (
          <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:16 }}>
            <div>
              <div style={{ fontWeight:600, fontSize:13, marginBottom:6 }}>Energieklasse</div>
              <select className='input' value={filters.energyClass} onChange={e=>setF('energyClass',e.target.value)}>
                <option value=''>Alle</option>
                {['A+','A','B','C','D','E','F','G'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Check label='Barrierefrei' k='barrierFree' />
          </div>
        )}

        <div style={{ display:'flex', gap:8, marginTop:24 }}>
          <button onClick={() => setApplied(filters)} className='btn-accent' style={{
            flex:2, padding:'12px', fontSize:14
          }}>Filter anwenden</button>
          <button onClick={() => { setFilters(initFilters); setApplied(initFilters) }} className='btn-secondary' style={{
            flex:1, padding:'12px', fontSize:13
          }}>Reset</button>
        </div>
      </aside>

      <main style={{ flex:1, padding:'32px 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div>
            <h1 style={{ fontSize:28, fontWeight:600, color: C.ink }}>Immobilien</h1>
            <p style={{ color: C.steel, fontSize:14, marginTop:4 }}>{filtered.length} Objekte gefunden</p>
          </div>
          <select className='input' value={sort} onChange={e=>setSort(e.target.value)} style={{ width: 200 }}>
            <option value='default'>Sortierung: Standard</option>
            <option value='price-asc'>Preis: aufsteigend</option>
            <option value='price-desc'>Preis: absteigend</option>
            <option value='sqm-desc'>Fläche: größte zuerst</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 24px', color: C.steel }} className='card'>
            <Icons.Building size={48} color={C.brandGreen} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize:20, marginBottom:8, color: C.ink }}>Keine Treffer</h3>
            <p>Bitte passen Sie Ihre Filtereinstellungen an.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24 }}>
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </main>
    </div>
  )
}