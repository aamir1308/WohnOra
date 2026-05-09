import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { validators } from '../utils/validation'
import { Icons } from '../components/Icons'

const C = {
  primary: '#0a0a0a',
  brandGreen: '#00d4a4',
  white: '#ffffff',
  surface: '#f7f7f7',
  steel: '#5a5a5c',
  ink: '#0a0a0a',
  hairline: '#e5e5e5',
  error: '#d45656'
}

export default function Login() {
  const [tab, setTab] = useState('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [role, setRole] = useState('seeker')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleChange = (field, value) => {
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)
    if (field === 'otp') setOtp(value)
    setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field)
  }

  const validateField = (field) => {
    let error = null
    switch (field) {
      case 'email':
        error = validators.email(email)
        break
      case 'password':
        if (!password) error = 'Passwort ist erforderlich'
        break
      case 'otp':
        if (otp && otp.length !== 6) error = 'OTP muss 6 Ziffern haben'
        break
      default:
        break
    }
    setErrors(prev => ({ ...prev, [field]: error }))
    return !error
  }

  const handlePasswordLogin = (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    
    const emailError = validators.email(email)
    const passwordError = password ? null : 'Passwort ist erforderlich'
    setErrors({ email: emailError, password: passwordError })
    
    if (emailError || passwordError) return
    
    setLoading(true)
    setTimeout(() => {
      const userData = { email, role }
      const r = email.includes('owner') || email.includes('vermieter') ? 'owner' : 'seeker'
      login({ ...userData, role: r })
      setLoading(false)
      navigate(r === 'owner' ? '/ownerdashboard' : '/seekerdashboard')
    }, 800)
  }

  const handleOtpSend = (e) => {
    e.preventDefault()
    const emailError = validators.email(email)
    setErrors({ email: emailError })
    if (emailError) return
    
    setOtpSent(true)
    setErrors({})
  }

  const handleOtpConfirm = (e) => {
    e.preventDefault()
    setTouched({ otp: true })
    
    if (otp !== '123456' && otp.length !== 6) {
      setErrors({ otp: 'Ungültige OTP. Bitte versuchen Sie es erneut.' })
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      login({ email, role: 'seeker' })
      setLoading(false)
      navigate('/seekerdashboard')
    }, 800)
  }

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 16px',
    border: touched[fieldName] && errors[fieldName] ? `2px solid ${C.error}` : `1px solid ${C.hairline}`,
    borderRadius: 8,
    fontSize: 16,
    outline: 'none',
    marginBottom: 4,
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease'
  })

  const getErrorStyle = () => ({
    color: C.error,
    fontSize: 13,
    marginBottom: 8,
    marginTop: 4
  })

  const btnStyle = {
    width: '100%',
    padding: '12px',
    background: loading ? C.brandGreen + '88' : C.brandGreen,
    color: C.primary,
    border: 'none',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 500,
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className='card' style={{ width: '100%', maxWidth: 440, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Icons.Home size={40} color={C.brandGreen} style={{ marginBottom: 12 }} />
          <h1 style={{ fontSize: 28, fontWeight: 600, color: C.ink, margin: '0 0 8px 0' }}>WohnOra</h1>
          <p style={{ color: C.steel, fontSize: 15 }}>Bei Ihrem Konto anmelden</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 14, color: C.ink, fontWeight: 500, display: 'block', marginBottom: 8 }}>Ich melde mich an als:</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['seeker','owner'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '12px', border: `2px solid ${role === r ? C.brandGreen : C.hairline}`,
                borderRadius: 8, background: role === r ? C.surface : C.white,
                color: role === r ? C.brandGreen : C.steel, fontWeight: role === r ? 600 : 400, cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}>
                {r === 'seeker' ? 'Suchender' : 'Eigentümer'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', marginBottom: 24, border: `1px solid ${C.hairline}`, borderRadius: 8, overflow: 'hidden' }}>
          {['password','otp'].map(t => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); setOtpSent(false); setTouched({}) }} style={{
              flex: 1, padding: '12px', border: 'none',
              background: tab === t ? C.primary : C.surface,
              color: tab === t ? C.white : C.steel, fontWeight: tab === t ? 500 : 400, cursor: 'pointer',
              fontSize: 14
            }}>
              {t === 'password' ? 'Passwort' : 'OTP'}
            </button>
          ))}
        </div>

        {tab === 'password' ? (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: 16 }}>
              <input 
                className='input'
                style={getInputStyle('email')} 
                type='email' 
                placeholder='E-Mail Adresse' 
                value={email} 
                onChange={e => handleChange('email', e.target.value)} 
                onBlur={() => handleBlur('email')}
                aria-label="E-Mail Adresse"
              />
              {touched.email && errors.email && <p style={getErrorStyle()}>{errors.email}</p>}
            </div>
            <div style={{ marginBottom: 20 }}>
              <input 
                className='input'
                style={getInputStyle('password')} 
                type='password' 
                placeholder='Passwort' 
                value={password} 
                onChange={e => handleChange('password', e.target.value)} 
                onBlur={() => handleBlur('password')}
                aria-label="Passwort"
              />
              {touched.password && errors.password && <p style={getErrorStyle()}>{errors.password}</p>}
            </div>
            <button type='submit' style={btnStyle} disabled={loading}>
              {loading ? 'Anmelden...' : 'Anmelden'}
            </button>
          </form>
        ) : (
          <form onSubmit={otpSent ? handleOtpConfirm : handleOtpSend}>
            <div style={{ marginBottom: 16 }}>
              <input 
                className='input'
                style={getInputStyle('email')} 
                type='email' 
                placeholder='E-Mail Adresse' 
                value={email} 
                onChange={e => handleChange('email', e.target.value)} 
                onBlur={() => handleBlur('email')}
                disabled={otpSent}
                aria-label="E-Mail Adresse"
              />
              {errors.email && <p style={getErrorStyle()}>{errors.email}</p>}
            </div>
            {otpSent && (
              <>
                <p style={{ color: C.brandGreen, fontSize: 14, marginBottom: 8 }}>OTP wurde an {email} gesendet.</p>
                <div style={{ marginBottom: 20 }}>
                  <input 
                    className='input'
                    style={getInputStyle('otp')} 
                    type='text' 
                    placeholder='6-stelliger OTP Code' 
                    value={otp} 
                    onChange={e => handleChange('otp', e.target.value)} 
                    onBlur={() => handleBlur('otp')}
                    maxLength={6}
                    aria-label="OTP Code"
                  />
                  {touched.otp && errors.otp && <p style={getErrorStyle()}>{errors.otp}</p>}
                </div>
              </>
            )}
            <button type='submit' style={btnStyle} disabled={loading}>
              {loading ? 'Bitte warten...' : otpSent ? 'OTP Bestätigen' : 'OTP Senden'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: 24, color: C.steel, fontSize: 14 }}>
          Noch kein Konto?{' '}
          <Link to='/register' style={{ color: C.brandGreen, fontWeight: 600 }}>Jetzt registrieren</Link>
        </p>
      </div>
    </div>
  )
}