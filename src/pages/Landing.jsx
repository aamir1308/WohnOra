import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { Icons } from '../components/Icons'

const C = {
  primary: '#0a0a0a',
  brandGreen: '#00d4a4',
  white: '#ffffff',
  surface: '#f7f7f7',
  steel: '#5a5a5c',
  ink: '#0a0a0a',
  heroSkyFrom: '#87a8c8',
  heroSkyTo: '#f5e9d8',
  heroDarkFrom: '#1a3d4a',
  heroDarkTo: '#2d5a4f',
  hairline: '#e5e5e5'
}

export default function Landing() {
  const { t } = useLanguage()
  
  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      {/* Hero Section - Sky Gradient */}
      <div style={{ 
        background: `linear-gradient(180deg, ${C.heroSkyFrom} 0%, ${C.heroSkyTo} 100%)`,
        padding: '120px 32px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Icons.Home size={72} color={C.brandGreen} style={{ marginBottom: 24 }} />
          <h1 style={{ 
            fontSize: 72, 
            fontWeight: 600, 
            lineHeight: 1.05, 
            letterSpacing: '-2px',
            marginBottom: 20,
            color: C.ink
          }}>
            {t('landing.title')}
          </h1>
          <p style={{ 
            fontSize: 18, 
            lineHeight: 1.5,
            marginBottom: 40, 
            color: C.steel,
            maxWidth: 600,
            margin: '0 auto 40px'
          }}>
            {t('landing.subtitle')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link 
              to='/properties' 
              className='btn-accent'
              style={{ 
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              {t('landing.searchProperties')}
            </Link>
            <Link 
              to='/register' 
              className='btn-secondary'
              style={{ 
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              {t('landing.registerNow')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ 
        maxWidth: 1280, 
        margin: '80px auto', 
        padding: '0 32px'
      }}>
        <h2 style={{ 
          fontSize: 36, 
          fontWeight: 600, 
          lineHeight: 1.2, 
          letterSpacing: '-0.5px',
          marginBottom: 48,
          textAlign: 'center',
          color: C.ink
        }}>
          {t('landing.whyWohnOra')}
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24 
        }}>
          {[
            { icon: Icons.Search, title: t('landing.comprehensiveSearch'), desc: t('landing.comprehensiveSearchDesc'), color: C.brandGreen },
            { icon: Icons.FileText, title: t('landing.easyManagement'), desc: t('landing.easyManagementDesc'), color: C.brandGreen },
            { icon: Icons.MessageCircle, title: t('landing.directCommunication'), desc: t('landing.directCommunicationDesc'), color: C.brandGreen }
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className='card' style={{ 
              padding: 32,
              background: C.surface,
              borderRadius: 12,
              border: `1px solid ${C.hairline}`
            }}>
              <Icon size={48} color={color} style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: C.ink }}>
                {title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.steel }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Dark Gradient */}
      <div style={{ 
        background: `linear-gradient(135deg, ${C.heroDarkFrom} 0%, ${C.heroDarkTo} 100%)`,
        padding: '96px 32px',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: 48, 
          marginBottom: 20, 
          color: C.white,
          fontWeight: 600
        }}>
          {t('landing.readyToFind')}
        </h2>
        <p style={{ 
          fontSize: 18, 
          marginBottom: 40, 
          maxWidth: 600, 
          margin: '0 auto 40px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          {t('landing.trustedBy')}
        </p>
        <Link 
          to='/register' 
          className='btn-on-dark'
          style={{ 
            padding: '16px 36px',
            fontSize: 16,
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          {t('landing.freeRegistration')}
        </Link>
      </div>

      {/* Footer */}
      <footer style={{
        background: C.surface,
        borderTop: `1px solid ${C.hairline}`,
        padding: '48px 32px'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 24, flexWrap: 'wrap' }}>
            {[
              { to: '/properties', label: 'Immobilien' },
              { to: '/search', label: 'Suche' },
              { to: '/map', label: 'Karte' },
              { to: '/amenities', label: 'Annehmlichkeiten' }
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{ color: C.steel, fontSize: 14, textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
          <p style={{ color: C.steel, fontSize: 13 }}>
            WohnOra Germany © 2026
          </p>
        </div>
      </footer>
    </div>
  )
}