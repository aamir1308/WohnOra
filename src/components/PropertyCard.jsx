import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icons } from './Icons'

const C = {
  primary: '#0a0a0a',
  brandGreen: '#00d4a4',
  surface: '#f7f7f7',
  white: '#ffffff',
  steel: '#5a5a5c',
  charcoal: '#1c1c1e',
  hairline: '#e5e5e5',
  ink: '#0a0a0a',
  muted: '#a8a8aa'
}

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
      className="property-card"
      style={{
        cursor: 'pointer',
        display: 'flex', 
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={property.image_url}
          alt={`Bild der Immobilie: ${property.title}`}
          className="property-image"
          style={{ borderRadius: '12px 12px 0 0' }}
          onError={e => { e.target.src = 'https://picsum.photos/seed/default/800/500' }}
          loading="lazy"
        />
        <span 
          aria-label={isRent ? 'Zur Miete' : 'Zum Kauf'}
          className="badge"
          style={{
            position: 'absolute', 
            top: 12, 
            left: 12,
            background: isRent ? C.primary : C.brandGreen,
            color: isRent ? C.white : C.primary, 
            padding: '4px 12px',
            fontWeight: 600
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
            background: 'rgba(0,0,0,0.6)', 
            color: C.white,
            padding: '4px 10px', 
            borderRadius: 6, 
            fontSize: 12
          }}
        >
          {typeLabels[property.type] || property.type}
        </span>
      </div>
      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div aria-label={`Preis: ${formatPrice(property.price)} Euro`} style={{ fontSize: 24, fontWeight: 700, color: C.ink, marginBottom: 4 }}>
          {formatPrice(property.price)} {isRent ? '€/Mon.' : '€'}
        </div>
        {isRent && property.warm_price && (
          <div style={{ fontSize: 13, color: C.steel, marginBottom: 8 }}>
            Warmmiete: {formatPrice(property.warm_price)} €/Mon.
          </div>
        )}
        <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: C.ink, lineHeight: 1.4 }}>
          {property.title}
        </h3>
        <div style={{ color: C.steel, fontSize: 14, marginBottom: 12 }}>
          {property.postal_code} {property.city}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 'auto' }}>
          <span aria-label={`${property.rooms} Zimmer`} style={{ fontSize: 14, color: C.charcoal, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icons.Bed size={16} />
            {property.rooms} Zi.
          </span>
          <span aria-label={`${property.size_sqm} Quadratmeter`} style={{ fontSize: 14, color: C.charcoal, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icons.Maximize size={16} />
            {property.size_sqm} m²
          </span>
          {property.parking && (
            <span aria-label="Parkplatz vorhanden" style={{ fontSize: 14, color: C.charcoal, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icons.Car size={16} />
            </span>
          )}
          {property.pets_allowed && (
            <span aria-label="Haustiere erlaubt" style={{ fontSize: 14, color: C.charcoal, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icons.PawPrint size={16} />
            </span>
          )}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {property.elevator && (
            <span aria-label="Aufzug vorhanden" className="badge" style={{ background: C.surface, color: C.charcoal, fontSize: 12 }}>Aufzug</span>
          )}
          {property.furnished && (
            <span aria-label="Möbliert" className="badge badge-green" style={{ fontSize: 12 }}>Möbliert</span>
          )}
          {property.barrier_free && (
            <span aria-label="Barrierefrei" className="badge" style={{ background: C.surface, color: C.charcoal, fontSize: 12 }}>Barrierefrei</span>
          )}
        </div>
      </div>
    </article>
  )
}