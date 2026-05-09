import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useLanguage } from '../i18n/LanguageContext'
import { Icons } from './Icons'

const C = {
  primary: '#0a0a0a',
  brandGreen: '#00d4a4',
  white: '#ffffff',
  steel: '#5a5a5c',
  surface: '#f7f7f7',
  hairline: '#e5e5e5'
}

export default function Navbar() {
  const { isLoggedIn, user, role, logout } = useAuthStore()
  const { language, toggleLanguage, t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkStyle = {
    color: C.white,
    fontWeight: 500,
    fontSize: 14,
    padding: '8px 16px',
    borderRadius: 6,
    transition: 'background 0.15s ease',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }

  const navLinkHoverStyle = {
    background: 'rgba(255,255,255,0.1)'
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
        background: C.primary,
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        borderBottom: `1px solid ${C.hairline}`
      }}
    >
      <Link 
        to='/' 
        aria-label="WohnOra - Home"
        style={{
          color: C.brandGreen,
          fontWeight: 700,
          fontSize: 20,
          textDecoration: 'none',
          marginRight: 40,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <Icons.Home size={22} />
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
        {[
          { to: '/properties', icon: Icons.Building, label: t('nav.properties') },
          { to: '/search', icon: Icons.Search, label: t('nav.search') },
          { to: '/map', icon: Icons.Map, label: t('nav.map') },
          { to: '/amenities', icon: Icons.MapPin, label: t('nav.amenities') }
        ].map(({ to, icon: Icon, label }) => (
          <Link 
            key={to}
            to={to} 
            role="menuitem"
            style={navLinkStyle}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} 
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>
      
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginLeft: 'auto'
        }}
        role="toolbar"
        aria-label="User actions"
      >
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          aria-label={`Switch to ${language === 'de' ? 'English' : 'Deutsch'}`}
          className="btn-secondary"
          style={{
            padding: '8px 14px',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 64,
            color: C.white,
            borderColor: 'rgba(255,255,255,0.3)'
          }}
        >
          <Icons.Globe size={16} />
          {language === 'de' ? 'EN' : 'DE'}
        </button>

        {isLoggedIn ? (
          <>
            {role && (
              <span 
                role="status"
                aria-label={`Logged in as ${role}`}
                className="badge badge-green"
                style={{
                  background: C.brandGreen,
                  color: C.primary,
                  padding: '4px 12px'
                }}
              >
                {role === 'owner' ? t('nav.owner') : t('nav.seeker')}
              </span>
            )}
            <span 
              aria-label={`User: ${user?.name || user?.email}`}
              style={{
                color: C.steel,
                fontSize: 14
              }}
            >
              {user?.name || user?.email}
            </span>
            <Link 
              to={role === 'owner' ? '/ownerdashboard' : '/seekerdashboard'} 
              aria-label="Go to Dashboard"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: C.white,
                padding: '8px 16px',
                borderRadius: 6,
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Icons.LayoutDashboard size={16} />
              {t('nav.dashboard')}
            </Link>
            <button 
              onClick={handleLogout} 
              aria-label="Logout"
              className="btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: 14
              }}
            >
              <Icons.LogOut size={16} style={{ marginRight: 6 }} />
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
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 16px',
                borderRadius: 6,
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Icons.LogIn size={16} />
              {t('nav.login')}
            </Link>
            <Link 
              to='/register' 
              aria-label="Register"
              className="btn-accent"
              style={{
                padding: '8px 16px',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none'
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