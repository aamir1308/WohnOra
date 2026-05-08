import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, getTranslation } from './translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('wohnora_language')
    return saved || 'de'
  })

  useEffect(() => {
    localStorage.setItem('wohnora_language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (path, params = {}) => {
    let text = getTranslation(language, path)
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach(key => {
        text = text.replace(`{${key}}`, params[key])
      })
    }
    return text
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de')
  }

  const value = {
    language,
    setLanguage,
    t,
    toggleLanguage,
    isGerman: language === 'de',
    isEnglish: language === 'en'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext