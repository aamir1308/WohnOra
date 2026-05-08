import React, { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { properties } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const selectedIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [35, 55],
  iconAnchor: [17, 55],
  popupAnchor: [1, -40],
  shadowSize: [55, 55],
  className: 'selected-marker'
})

const MapBounds = ({ properties }) => {
  const map = useMap()
  
  useEffect(() => {
    const validProps = properties.filter(p => p.lat && p.lng)
    if (validProps.length > 0) {
      const bounds = validProps.map(p => [p.lat, p.lng])
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
    }
  }, [properties, map])
  
  return null
}

export default function Map() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [hoveredProperty, setHoveredProperty] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const cities = useMemo(() => ['all', ...new Set(properties.map(p => p.city))], [])
  const types = ['all', 'apartment', 'house', 'studio', 'penthouse', 'duplex']
  const categories = [
    { value: '', label: 'Alle' },
    { value: 'rent', label: 'Miete' },
    { value: 'buy', label: 'Kauf' }
  ]
  
  const typeLabels = {
    apartment: 'Wohnung',
    house: 'Haus',
    studio: 'Studio',
    penthouse: 'Penthouse',
    duplex: 'Maisonette'
  }
  
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.postal_code.includes(searchQuery)
      
      const matchesCity = !selectedCity || selectedCity === 'all' || p.city === selectedCity
      const matchesType = !selectedType || selectedType === 'all' || p.type === selectedType
      const matchesCategory = !selectedCategory || p.category === selectedCategory
      
      return matchesSearch && matchesCity && matchesType && matchesCategory
    })
  }, [searchQuery, selectedCity, selectedType, selectedCategory])
  
  const formatPrice = (price, category) => {
    return new Intl.NumberFormat('de-DE').format(price) + ' €' + (category === 'rent' ? '/Mon.' : '')
  }
  
  const handleViewProperty = (id) => {
    navigate(`/propertydetail/${id}`)
  }
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: C.cream,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        background: `linear-gradient(135deg, ${C.darkRed}, ${C.navy})`, 
        color: 'white', 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Map size={24} color={C.accent} /> Kartensuche
        </h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
          {filteredProperties.length} Immobilien gefunden
        </p>
      </div>
      
      {/* Search Bar */}
      <div style={{ 
        background: C.white,
        padding: '16px 24px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, minWidth: 250 }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ort, Straße, PLZ..."
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: '0.95rem'
            }}
          />
        </div>
        
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: '0.95rem',
            background: C.white,
            minWidth: 140
          }}
        >
          <option value="">Alle Städte</option>
          {cities.filter(c => c !== 'all').map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: '0.95rem',
            background: C.white,
            minWidth: 140
          }}
        >
          <option value="">Alle Typen</option>
          {types.filter(t => t !== 'all').map(type => (
            <option key={type} value={type}>{typeLabels[type]}</option>
          ))}
        </select>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: '0.95rem',
            background: C.white,
            minWidth: 120
          }}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        
        <button
          onClick={() => { setSearchQuery(''); setSelectedCity(''); setSelectedType(''); setSelectedCategory('') }}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: '0.9rem',
            cursor: 'pointer',
            color: C.muted
          }}
        >
          <Icons.X size={16} /> Reset
        </button>
      </div>
      
      {/* Main Content - Map + Sidebar */}
      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        {/* Map */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer 
            center={[52.52, 13.405]} 
            zoom={6} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer 
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapBounds properties={filteredProperties} />
            
            {filteredProperties.map((property) => (
              property.lat && property.lng && (
                <Marker 
                  key={property.id}
                  position={[property.lat, property.lng]}
                  icon={selectedProperty?.id === property.id ? selectedIcon : customIcon}
                  eventHandlers={{
                    click: () => setSelectedProperty(property),
                    mouseover: () => setHoveredProperty(property),
                    mouseout: () => setHoveredProperty(null)
                  }}
                >
                  <Popup>
                    <div style={{ width: 220, padding: 4 }}>
                      <img 
                        src={property.image_url} 
                        alt={property.title}
                        style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }}
                        onError={(e) => e.target.src = 'https://picsum.photos/seed/map/400/250'}
                      />
                      <div style={{
                        background: property.category === 'rent' ? C.navy : C.primary,
                        color: '#fff',
                        fontSize: 10,
                        padding: '2px 6px',
                        borderRadius: 10,
                        display: 'inline-block',
                        marginBottom: 4
                      }}>
                        {property.category === 'rent' ? 'MIETE' : 'KAUF'}
                      </div>
                      <h4 style={{ margin: '4px 0', fontSize: '0.85rem', color: '#333', lineHeight: 1.3 }}>
                        {property.title.length > 50 ? property.title.substring(0, 50) + '...' : property.title}
                      </h4>
                      <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#666' }}>
                        {property.city}
                      </p>
                      <p style={{ margin: '4px 0', fontWeight: 700, fontSize: '0.95rem', color: C.primary }}>
                        {formatPrice(property.price, property.category)}
                      </p>
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 4 }}>
                        {property.rooms} Zi. · {property.size_sqm} m²
                      </div>
                      <button
                        onClick={() => handleViewProperty(property.id)}
                        style={{
                          width: '100%',
                          marginTop: 8,
                          padding: '6px 12px',
                          background: C.primary,
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Details ansehen
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
          
          {/* Selected Property Card Overlay */}
          {selectedProperty && (
            <div style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              right: 24,
              maxWidth: 500,
              background: C.white,
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              padding: 16,
              zIndex: 1000,
              display: 'flex',
              gap: 16
            }}>
              <img 
                src={selectedProperty.image_url} 
                alt={selectedProperty.title}
                style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                onError={(e) => e.target.src = 'https://picsum.photos/seed/sel/400/250'}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{
                    background: selectedProperty.category === 'rent' ? '#DD0000' : '#000000',
                    color: '#fff',
                    fontSize: 10,
                    padding: '2px 8px',
                    borderRadius: 10,
                    fontWeight: 700
                  }}>
                    {selectedProperty.category === 'rent' ? 'MIETE' : 'KAUF'}
                  </span>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  >
                    <Icons.X size={16} color={C.muted} />
                  </button>
                </div>
                <h3 style={{ margin: '4px 0', fontSize: '1rem', color: '#333', lineHeight: 1.3 }}>
                  {selectedProperty.title}
                </h3>
                <p style={{ margin: '4px 0', fontSize: '0.85rem', color: C.muted }}>
                  <Icons.MapPin size={12} style={{ marginRight: 2 }} /> {selectedProperty.city}
                </p>
                <p style={{ margin: '4px 0', fontWeight: 700, fontSize: '1.1rem', color: '#DD0000' }}>
                  {formatPrice(selectedProperty.price, selectedProperty.category)}
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button
                    onClick={() => handleViewProperty(selectedProperty.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: C.primary,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Property List Sidebar */}
        <div style={{
          width: 340,
          background: C.white,
          borderLeft: '1px solid #e0e0e0',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: 16, borderBottom: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: 0, color: C.primary, fontSize: '1rem' }}>
              {filteredProperties.length} Immobilien
            </h3>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: C.muted }}>
              <Icons.Search size={40} color={C.primary} style={{ marginBottom: 12 }} />
              <p>Keine Immobilien gefunden</p>
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredProperties.map(property => (
                <div 
                  key={property.id}
                  onClick={() => setSelectedProperty(property)}
                  style={{
                    padding: 12,
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    background: selectedProperty?.id === property.id ? '#FFF5F5' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#FFF8F8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = selectedProperty?.id === property.id ? '#FFF5F5' : 'transparent'}
                >
                  <div style={{ display: 'flex', gap: 10 }}>
                    <img 
                      src={property.image_url} 
                      alt={property.title}
                      style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                      onError={(e) => e.target.src = 'https://picsum.photos/seed/side/200/150'}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
                        <span style={{
                          background: property.category === 'rent' ? C.navy : C.primary,
                          color: '#fff',
                          fontSize: 9,
                          padding: '1px 6px',
                          borderRadius: 8,
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {property.category === 'rent' ? 'MIETE' : 'KAUF'}
                        </span>
                      </div>
                      <h4 style={{ margin: '4px 0', fontSize: '0.85rem', color: '#333', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {property.title}
                      </h4>
                      <p style={{ margin: '2px 0', fontSize: '0.8rem', color: C.muted }}>
                        {property.city}
                      </p>
                      <p style={{ margin: '2px 0', fontWeight: 700, fontSize: '0.95rem', color: C.primary }}>
                        {formatPrice(property.price, property.category)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .selected-marker {
          filter: hue-rotate(320deg) saturate(2);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .leaflet-popup-content {
          margin: 8px;
        }
      `}</style>
    </div>
  )
}