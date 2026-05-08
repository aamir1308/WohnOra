import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icons } from './Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

export default function PropertyCard({ property }) {
  const navigate = useNavigate()
  const isRent = property.category === 'rent'

  const formatPrice = (price) => {
    if (!price) return ''
    return new Intl.NumberFormat('de-DE').format(price)
  }

  const typeLabels = {
    apartment: 'Wohnung', 
    house: 'Haus', 
    studio: 'Studio',
    penthouse: 'Penthouse', 
    duplex: 'Maisonette'
  }

  const handleClick = () => {
    navigate('/propertydetail/' + property.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${property.title}, ${formatPrice(property.price)} Euro ${isRent ? 'pro Monat' : ''}, ${property.size_sqm} Quadratmeter, ${property.rooms} Zimmer in ${property.city}`}
      style={{
        background: '#fff', 
        borderRadius: 12, 
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,48,73,0.1)', 
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex', 
        flexDirection: 'column'
      }}
      onMouseEnter={e => { 
        e.currentTarget.style.transform = 'translateY(-4px)'; 
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,48,73,0.15)' 
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.transform = 'translateY(0)'; 
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,48,73,0.1)' 
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={property.image_url}
          alt={`Bild der Immobilie: ${property.title}`}
          style={{ width: '100%', height: 200, objectFit: 'cover' }}
          onError={e => { e.target.src = 'https://picsum.photos/seed/default/800/500' }}
          loading="lazy"
        />
        <span 
          aria-label={isRent ? 'Zur Miete' : 'Zum Kauf'}
          style={{
            position: 'absolute', 
            top: 12, 
            left: 12,
            background: isRent ? C.navy : C.primary,
            color: '#fff', 
            padding: '4px 10px', 
            borderRadius: 20,
            fontSize: 12, 
            fontWeight: 700, 
            letterSpacing: 1
          }}
        >
          {isRent ? 'MIETEN' : 'KAUFEN'}
        </span>
        <span 
          aria-label={`Immobilientyp: ${typeLabels[property.type] || property.type}`}
          style={{
            position: 'absolute', 
            top: 12, 
            right: 12,
            background: C.navy, 
            color: '#fff',
            padding: '4px 8px', 
            borderRadius: 6, 
            fontSize: 11
          }}
        >
          {typeLabels[property.type] || property.type}
        </span>
      </div>
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div aria-label={`Preis: ${formatPrice(property.price)} Euro`} style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
          {formatPrice(property.price)} {isRent ? '€/Mon.' : '€'}
        </div>
        {isRent && property.warm_price && (
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
            Warmmiete: {formatPrice(property.warm_price)} €/Mon.
          </div>
        )}
        <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: C.navy, lineHeight: 1.3 }}>
          {property.title}
        </h3>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 12 }}>
          {property.postal_code} {property.city}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 'auto' }}>
          <span aria-label={`${property.rooms} Zimmer`} style={{ fontSize: 13, color: C.navy, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icons.Bed size={14} />
            {property.rooms} Zi.
          </span>
          <span aria-label={`${property.size_sqm} Quadratmeter`} style={{ fontSize: 13, color: C.navy, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icons.Maximize size={14} />
            {property.size_sqm} m²
          </span>
          {property.parking && (
            <span aria-label="Parkplatz vorhanden" style={{ fontSize: 13, color: C.navy, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icons.Car size={14} />
            </span>
          )}
          {property.pets_allowed && (
            <span aria-label="Haustiere erlaubt" style={{ fontSize: 13, color: C.navy, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icons.PawPrint size={14} />
            </span>
          )}
          {property.balcony && (
            <span aria-label="Balkon oder Terrasse vorhanden" style={{ fontSize: 13, color: C.navy, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icons.Leaf size={14} />
            </span>
          )}
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {property.elevator && (
            <span aria-label="Aufzug vorhanden" style={{ background: C.cream, color: C.navy, fontSize: 11, padding: '2px 6px', borderRadius: 4 }}>Aufzug</span>
          )}
          {property.furnished && (
            <span aria-label="Möbliert" style={{ background: C.accent, color: C.navy, fontSize: 11, padding: '2px 6px', borderRadius: 4 }}>Möbliert</span>
          )}
          {property.barrier_free && (
            <span aria-label="Barrierefrei" style={{ background: C.cream, color: C.navy, fontSize: 11, padding: '2px 6px', borderRadius: 4 }}>Barrierefrei</span>
          )}
        </div>
      </div>
    </article>
  )
}