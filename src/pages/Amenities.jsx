import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { amenities } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#0a0a0a', brandGreen: '#00d4a4', white: '#ffffff', surface: '#f7f7f7', steel: '#5a5a5c', ink: '#0a0a0a', hairline: '#e5e5e5' }

const getCategoryIcon = (category) => {
  const iconMap = {
    'Supermarkt': <Icons.ShoppingCart size={24} color={C.brandGreen} />,
    'Bäckerei': <Icons.Bread size={24} color="#8D6E63" />,
    'Café': <Icons.Coffee size={24} color="#795548" />,
    'Restaurant': <Icons.UtensilsCrossed size={24} color="#E65100" />,
    'Park': <Icons.Trees size={24} color="#2E7D32" />,
    'Krankenhaus': <Icons.Hospital size={24} color="#C62828" />,
    'Schule': <Icons.School size={24} color="#1565C0" />,
    'Apotheke': <Icons.Pill size={24} color="#7B1FA2" />,
    'Fitness': <Icons.Dumbbell size={24} color="#D84315" />,
    'Universität': <Icons.GraduationCap size={24} color="#0D47A1" />,
    'Bibliothek': <Icons.Library size={24} color="#4E342E" />,
    'Kindergarten': <Icons.Baby size={24} color="#F06292" />,
    'Post': <Icons.Mail size={24} color="#455A64" />
  }
  return iconMap[category] || <Icons.MapPin size={24} color={C.brandGreen} />
}

export default function Amenities() {
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const cities = ['all', ...new Set(amenities.map(a => a.city))]
  const categories = ['all', ...new Set(amenities.map(a => a.category))]

  const filteredAmenities = amenities.filter(amenity => {
    const matchesCity = selectedCity === 'all' || amenity.city === selectedCity
    const matchesCategory = selectedCategory === 'all' || amenity.category === selectedCategory
    const matchesSearch = !searchQuery || 
      amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amenity.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCity && matchesCategory && matchesSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: C.surface }}>
      <div style={{ 
        background: C.ink, 
        color: C.white, 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.MapPin size={24} color={C.brandGreen} /> Umgebung & Annehmlichkeiten
        </h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
          Entdecke Geschäfte, Schulen und Freizeitmöglichkeiten in der Nähe
        </p>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '32px auto', 
        padding: '0 24px'
      }}>
        {/* Search and Filters */}
        <div style={{ 
          background: C.white, 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          marginBottom: '32px',
          border: `1px solid ${C.hairline}`
        }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'end' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                Suchen
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name oder Adresse..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${C.hairline}`,
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: C.white
                }}
              />
            </div>

            <div style={{ minWidth: '150px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                Stadt
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${C.hairline}`,
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: C.white
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'Alle Städte' : city}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ minWidth: '150px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                Kategorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${C.hairline}`,
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: C.white
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Alle Kategorien' : category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCity('all')
                setSelectedCategory('all')
              }}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: `1px solid ${C.hairline}`,
                borderRadius: '9999px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: C.steel
              }}
            >
              <Icons.X size={16} /> Zurücksetzen
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ color: C.ink, margin: 0 }}>
            {filteredAmenities.length} Ergebnis{filteredAmenities.length !== 1 ? 'e' : ''}
          </h2>
        </div>

        {/* Amenities Grid */}
        {filteredAmenities.length === 0 ? (
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
              Versuche andere Filtereinstellungen oder wähle eine andere Stadt.
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px'
          }}>
            {filteredAmenities.map(amenity => (
              <div 
                key={amenity.id} 
                style={{ 
                  background: C.white, 
                  borderRadius: '12px', 
                  padding: '20px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  border: `1px solid ${C.hairline}`,
                  borderLeft: `4px solid ${C.brandGreen}`
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0 }}>
                    {getCategoryIcon(amenity.category)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '1rem', 
                      color: C.ink 
                    }}>
                      {amenity.name}
                    </h3>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: C.brandGreen, 
                      marginBottom: '8px',
                      fontWeight: 600
                    }}>
                      {amenity.category} • {amenity.city}
                    </div>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: C.steel,
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <Icons.MapPin size={12} /> {amenity.address}
                    </div>
                    {amenity.distance_m && (
                      <div style={{ 
                        fontSize: '0.85rem', 
                        color: C.steel,
                        marginBottom: '8px'
                      }}>
                        Entfernung: ~{amenity.distance_m}m
                      </div>
                    )}
                    {amenity.opening_hours && (
                      <div style={{ 
                        fontSize: '0.85rem', 
                        color: C.steel,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Icons.Clock size={12} /> {amenity.opening_hours}
                      </div>
                    )}
                    {amenity.rating && (
                      <div style={{ 
                        marginTop: '8px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Icons.Star size={14} color={C.brandGreen} fill={C.brandGreen} /> {amenity.rating.toFixed(1)} ({amenity.reviews_count} Bewertungen)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}