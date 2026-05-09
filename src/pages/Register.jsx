import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { validators, validateForm } from '../utils/validation'
import { Icons } from '../components/Icons'

const C = { primary: '#0a0a0a', brandGreen: '#00d4a4', white: '#ffffff', surface: '#f7f7f7', steel: '#5a5a5c', ink: '#0a0a0a', hairline: '#e5e5e5' }

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker',
    phone: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [success, setSuccess] = useState(false)
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field)
  }

  const validateField = (field) => {
    let error = null
    switch (field) {
      case 'name':
        error = validators.name(form.name)
        break
      case 'email':
        error = validators.email(form.email)
        break
      case 'phone':
        error = validators.phone(form.phone)
        break
      case 'password':
        error = validators.password(form.password)
        break
      case 'confirmPassword':
        if (form.password !== form.confirmPassword) {
          error = 'Die Passwörter stimmen nicht überein'
        }
        break
      case 'agreeTerms':
        if (!form.agreeTerms) {
          error = 'Sie müssen die AGB akzeptieren'
        }
        break
      default:
        break
    }
    setErrors(prev => ({ ...prev, [field]: error }))
    return !error
  }

  const validateAllFields = () => {
    const newErrors = {}
    newErrors.name = validators.name(form.name)
    newErrors.email = validators.email(form.email)
    newErrors.phone = validators.phone(form.phone)
    newErrors.password = validators.password(form.password)
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Die Passwörter stimmen nicht überein'
    }
    if (!form.agreeTerms) {
      newErrors.agreeTerms = 'Sie müssen die AGB akzeptieren'
    }
    setErrors(newErrors)
    return Object.values(newErrors).every(e => !e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true, agreeTerms: true })
    
    if (!validateAllFields()) {
      return
    }
    
    setSuccess(true)
    setTimeout(() => {
      login({
        email: form.email,
        role: form.role,
        name: form.name
      })
      navigate(form.role === 'owner' ? '/ownerdashboard' : '/seekerdashboard')
    }, 2000)
  }

  if (success) {
    return (
      <div style={{ 
        minHeight: 'calc(100vh - 64px)', 
        background: C.surface, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 24 
      }}>
        <div style={{ 
          background: C.white, 
          borderRadius: 12, 
          padding: 40, 
          width: '100%', 
          maxWidth: 440, 
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <Icons.CheckCircle size={48} color={C.brandGreen} style={{ marginBottom: 16 }} />
          <h2 style={{ color: C.ink, marginBottom: 8 }}>Registrierung erfolgreich!</h2>
          <p style={{ color: C.steel, marginBottom: 24 }}>
            Dein Konto wurde erstellt. Du wirst automatisch eingeloggt...
          </p>
        </div>
      </div>
    )
  }

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '10px 14px',
    border: touched[fieldName] && errors[fieldName] ? `2px solid ${C.primary}` : `1px solid ${C.hairline}`,
    borderRadius: 8,
    fontSize: 15,
    outline: 'none',
    marginBottom: 4,
    boxSizing: 'border-box',
    background: C.white
  })

  const getErrorStyle = () => ({
    color: C.primary,
    fontSize: '0.8rem',
    marginBottom: 8,
    marginTop: 0
  })

  const btnStyle = {
    width: '100%',
    padding: '12px',
    background: C.primary,
    color: C.white,
    border: 'none',
    borderRadius: '9999px',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer'
  }

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      background: C.surface, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 24 
    }}>
      <div style={{ 
        background: C.white, 
        borderRadius: 12, 
        padding: 40, 
        width: '100%', 
        maxWidth: 480, 
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Icons.Home size={36} color={C.brandGreen} style={{ marginBottom: 8 }} />
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.ink, margin: 0 }}>WohnOra</h1>
          <p style={{ color: C.steel, marginTop: 6 }}>Jetzt Konto erstellen</p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            fontSize: 14, 
            color: C.steel, 
            fontWeight: 600, 
            display: 'block', 
            marginBottom: 6 
          }}>
            Ich möchte:
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['seeker', 'owner'].map(r => (
              <button 
                key={r} 
                type="button"
                onClick={() => handleChange('role', r)} 
                style={{
                  flex: 1, 
                  padding: '10px', 
                  border: `2px solid ${form.role === r ? C.primary : C.hairline}`,
                  borderRadius: 8, 
                  background: form.role === r ? C.surface : C.white,
                  color: form.role === r ? C.ink : C.steel, 
                  fontWeight: form.role === r ? 700 : 400, 
                  cursor: 'pointer'
                }}
              >
                {r === 'seeker' ? 'Wohnung suchen' : 'Immobilie anbieten'}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <input 
              style={getInputStyle('name')} 
              type='text' 
              placeholder='Vollständiger Name *' 
              value={form.name} 
              onChange={e => handleChange('name', e.target.value)} 
              onBlur={() => handleBlur('name')}
            />
            {touched.name && errors.name && (
              <p style={getErrorStyle()}>{errors.name}</p>
            )}
          </div>
          
          <div style={{ marginBottom: 12 }}>
            <input 
              style={getInputStyle('email')} 
              type='email' 
              placeholder='E-Mail-Adresse *' 
              value={form.email} 
              onChange={e => handleChange('email', e.target.value)} 
              onBlur={() => handleBlur('email')}
            />
            {touched.email && errors.email && (
              <p style={getErrorStyle()}>{errors.email}</p>
            )}
          </div>
          
          <div style={{ marginBottom: 12 }}>
            <input 
              style={getInputStyle('phone')} 
              type='tel' 
              placeholder='Telefonnummer (optional)' 
              value={form.phone} 
              onChange={e => handleChange('phone', e.target.value)} 
              onBlur={() => handleBlur('phone')}
            />
            {touched.phone && errors.phone && (
              <p style={getErrorStyle()}>{errors.phone}</p>
            )}
          </div>
          
          <div style={{ marginBottom: 12 }}>
            <input 
              style={getInputStyle('password')} 
              type='password' 
              placeholder='Passwort * (min. 8 Zeichen)' 
              value={form.password} 
              onChange={e => handleChange('password', e.target.value)} 
              onBlur={() => handleBlur('password')}
            />
            {touched.password && errors.password && (
              <p style={getErrorStyle()}>{errors.password}</p>
            )}
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <input 
              style={getInputStyle('confirmPassword')} 
              type='password' 
              placeholder='Passwort bestätigen *' 
              value={form.confirmPassword} 
              onChange={e => handleChange('confirmPassword', e.target.value)} 
              onBlur={() => handleBlur('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p style={getErrorStyle()}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div style={{ 
            marginBottom: 20, 
            padding: '12px', 
            background: C.surface,
            borderRadius: 8 
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 8, 
              cursor: 'pointer',
              fontSize: 13,
              lineHeight: 1.4
            }}>
              <input 
                type='checkbox' 
                checked={form.agreeTerms} 
                onChange={e => handleChange('agreeTerms', e.target.checked)}
                onBlur={() => handleBlur('agreeTerms')}
                style={{ marginTop: 2 }}
              />
              <span>
                Ich stimme den{' '}
                <Link to='/terms' style={{ color: C.brandGreen }}>AGB</Link>
                {' '}und{' '}
                <Link to='/privacy' style={{ color: C.brandGreen }}>Datenschutzerklärung</Link>
                {' '}zu und bin mit der Verarbeitung meiner Daten einverstanden.
              </span>
            </label>
            {touched.agreeTerms && errors.agreeTerms && (
              <p style={{ ...getErrorStyle(), marginTop: 8 }}>{errors.agreeTerms}</p>
            )}
          </div>

          <button type='submit' style={btnStyle}>
            Konto erstellen
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: C.steel, fontSize: 14 }}>
          Bereits ein Konto?{' '}
          <Link to='/login' style={{ color: C.brandGreen, fontWeight: 600 }}>
            Jetzt anmelden
          </Link>
        </p>
      </div>
    </div>
  )
}