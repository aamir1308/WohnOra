import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

export default function Landing() {
  const { t } = useLanguage()
  
  return (
    <div style={{ minHeight: '100vh', background: C.cream }}>
      <div style={{ 
        background: `linear-gradient(135deg, ${C.darkRed}, ${C.primary})`, 
        color: 'white', 
        textAlign: 'center', 
        padding: '80px 24px'
      }}>
        <Icons.Home size={64} color={C.accent} style={{ marginBottom: 16 }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
          {t('landing.title')}
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '32px', opacity: 0.9 }}>
          {t('landing.subtitle')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link 
            to='/properties' 
            style={{ 
              background: C.accent, 
              color: C.navy, 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textDecoration: 'none'
            }}
          >
            {t('landing.searchProperties')}
          </Link>
          <Link 
            to='/register' 
            style={{ 
background: 'transparent', 
              color: C.accent,
              border: `2px solid ${C.accent}`,
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textDecoration: 'none'
            }}
          >
            {t('landing.registerNow')}
          </Link>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '40px auto', 
        padding: '0 24px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: C.primary, marginBottom: '32px' }}>{t('landing.whyWohnOra')}</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          <div style={{ padding: '24px', background: C.white, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
            <Icons.Search size={40} color={C.accent} style={{ marginBottom: 12 }} />
            <h3 style={{ color: C.black, marginBottom: '8px' }}>{t('landing.comprehensiveSearch')}</h3>
            <p style={{ color: C.muted, lineHeight: 1.6 }}>
              {t('landing.comprehensiveSearchDesc')}
            </p>
          </div>
          <div style={{ padding: '24px', background: C.white, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
            <Icons.FileText size={40} color={C.accent} style={{ marginBottom: 12 }} />
            <h3 style={{ color: C.black, marginBottom: '8px' }}>{t('landing.easyManagement')}</h3>
            <p style={{ color: C.muted, lineHeight: 1.6 }}>
              {t('landing.easyManagementDesc')}
            </p>
          </div>
          <div style={{ padding: '24px', background: C.white, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
            <Icons.MessageCircle size={40} color={C.accent} style={{ marginBottom: 12 }} />
            <h3 style={{ color: C.black, marginBottom: '8px' }}>{t('landing.directCommunication')}</h3>
            <p style={{ color: C.muted, lineHeight: 1.6 }}>
              {t('landing.directCommunicationDesc')}
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: C.navy, 
        color: 'white', 
        textAlign: 'center', 
        padding: '60px 24px'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: C.cream }}>{t('landing.readyToFind')}</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', color: C.cream }}>
          {t('landing.trustedBy')}
        </p>
        <Link 
          to='/register' 
          style={{ 
            background: C.primary, 
            color: C.white, 
            border: 'none', 
            padding: '14px 32px', 
            borderRadius: '8px', 
            fontWeight: 700, 
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'inline-block',
            textDecoration: 'none'
          }}
        >
          {t('landing.freeRegistration')}
        </Link>
      </div>
    </div>
  )
}