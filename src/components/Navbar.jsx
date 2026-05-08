import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useLanguage } from '../i18n/LanguageContext'
import { Icons } from './Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

export default function Navbar() {
  const { isLoggedIn, user, role, logout } = useAuthStore()
  const { language, toggleLanguage, t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const roleBadge = {
    seeker: { label: t('nav.seeker'), color: '#C1121f' },
    owner: { label: t('nav.owner'), color: '#669bbc' }
  }

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 64,
        background: C.navy,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}
    >
      <Link 
        to='/' 
        aria-label="WohnOra - Home"
        style={{
          color: C.accent,
          fontWeight: 800,
          fontSize: 22,
          textDecoration: 'none',
          marginRight: 24,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <Icons.Home size={24} />
        WohnOra
      </Link>
      <div 
        style={{
          display: 'flex',
          gap: 4,
          flex: 1,
          alignItems: 'center'
        }} 
        role="menubar"
        aria-label="Main menu"
      >
        <Link 
          to='/properties' 
          role="menuitem"
          style={{
            color: C.white,
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: 6,
            transition: 'background 0.2s',
            textDecoration: 'none',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(102,155,188,0.2)'} 
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          <Icons.Building size={18} />
          {t('nav.properties')}
        </Link>
        <Link 
          to='/search' 
          role="menuitem"
          style={{
            color: C.white,
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: 6,
            transition: 'background 0.2s',
            textDecoration: 'none',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(102,155,188,0.2)'} 
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          <Icons.Search size={18} />
          {t('nav.search')}
        </Link>
        <Link 
          to='/map' 
          role="menuitem"
          style={{
            color: C.white,
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: 6,
            transition: 'background 0.2s',
            textDecoration: 'none',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(102,155,188,0.2)'} 
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          <Icons.Map size={18} />
          {t('nav.map')}
        </Link>
        <Link 
          to='/amenities' 
          role="menuitem"
          style={{
            color: C.white,
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: 6,
            transition: 'background 0.2s',
            textDecoration: 'none',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(102,155,188,0.2)'} 
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          <Icons.MapPin size={18} />
          {t('nav.amenities')}
        </Link>
      </div>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginLeft: 'auto'
        }}
        role="toolbar"
        aria-label="User actions"
      >
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          aria-label={`Switch to ${language === 'de' ? 'English' : 'Deutsch'}`}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            color: C.white,
            padding: '6px 12px',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 60
          }}
        >
          <Icons.Globe size={16} />
          {language === 'de' ? 'EN' : 'DE'}
        </button>

        {isLoggedIn ? (
          <>
            {role && roleBadge[role] && (
              <span 
                role="status"
                aria-label={`Logged in as ${roleBadge[role].label}`}
                style={{
                  background: roleBadge[role].color,
                  color: role === 'owner' ? C.black : C.white,
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600
                }}
              >
                {roleBadge[role].label}
              </span>
            )}
            <span 
              aria-label={`User: ${user?.name || user?.email}`}
              style={{
                color: C.white,
                fontSize: 14
              }}
            >
              {user?.name || user?.email}
            </span>
            <Link 
              to={role === 'owner' ? '/ownerdashboard' : '/seekerdashboard'} 
              aria-label="Go to Dashboard"
              style={{
                background: 'rgba(102,155,188,0.2)',
                color: C.accent,
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Icons.LayoutDashboard size={16} />
              {t('nav.dashboard')}
            </Link>
            <button 
              onClick={handleLogout} 
              aria-label="Logout"
              style={{
                background: C.primary,
                color: C.white,
                border: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Icons.LogOut size={16} />
              {t('nav.logout')}
            </button>
          </>
        ) : (
          <>
            <Link 
              to='/login' 
              aria-label="Login"
              style={{
                color: C.white,
                border: '1px solid rgba(255,255,255,0.5)',
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Icons.LogIn size={16} />
              {t('nav.login')}
            </Link>
            <Link 
              to='/register' 
              aria-label="Register"
              style={{
                background: C.accent,
                color: C.navy,
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Icons.UserPlus size={16} />
              {t('nav.register')}
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}