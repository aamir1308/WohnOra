import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { validators } from '../utils/validation'
import { Icons } from '../components/Icons'

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
    padding: '10px 14px',
    border: touched[fieldName] && errors[fieldName] ? '2px solid #C62828' : '1px solid #ccc',
    borderRadius: 8,
    fontSize: 15,
    outline: 'none',
    marginBottom: 4,
    boxSizing: 'border-box'
  })

  const getErrorStyle = () => ({
    color: '#C62828',
    fontSize: '0.8rem',
    marginBottom: 8,
    marginTop: 0
  })

  const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

  const btnStyle = {
    width: '100%',
    padding: '12px',
    background: loading ? C.primary + '88' : C.primary,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 40, width: '100%', maxWidth: 440, boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Icons.Home size={36} color={C.primary} style={{ marginBottom: 8 }} />
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.primary, margin: 0 }}>WohnOra</h1>
          <p style={{ color: C.muted, marginTop: 6 }}>Bei Ihrem Konto anmelden</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 14, color: C.black, fontWeight: 600, display: 'block', marginBottom: 6 }}>Ich melde mich an als:</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['seeker','owner'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '8px', border: '2px solid ' + (role === r ? C.primary : '#ddd'),
                borderRadius: 8, background: form.role === r ? C.cream : '#fff',
                color: form.role === r ? C.primary : C.muted, fontWeight: role === r ? 700 : 400, cursor: 'pointer'
              }}>
                {r === 'seeker' ? 'Suchender' : 'Eigentümer'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', marginBottom: 24, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
          {['password','otp'].map(t => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); setOtpSent(false); setTouched({}) }} style={{
              flex: 1, padding: '10px', border: 'none',
              background: tab === t ? C.primary : '#f5f5f5',
              color: tab === t ? '#fff' : C.muted, fontWeight: tab === t ? 700 : 400, cursor: 'pointer'
            }}>
              {t === 'password' ? 'Passwort Login' : 'OTP Login'}
            </button>
          ))}
        </div>

        {tab === 'password' ? (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: 12 }}>
              <input 
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
            <div style={{ marginBottom: 12 }}>
              <input 
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
            <div style={{ marginBottom: 12 }}>
              <input 
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
                <p style={{ color: C.primary, fontSize: 14, marginBottom: 8 }}>OTP wurde an {email} gesendet.</p>
                <div style={{ marginBottom: 12 }}>
                  <input 
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
              {loading ? 'Bitte warten...' : otpSent ? 'OTP Bestaetigen' : 'OTP Senden'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: 20, color: '#666', fontSize: 14 }}>
          Noch kein Konto?{' '}
          <Link to='/register' style={{ color: C.primary, fontWeight: 600 }}>Jetzt registrieren</Link>
        </p>
      </div>
    </div>
  )
}