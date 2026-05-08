export const validators = {
  email: (value) => {
    if (!value) return 'E-Mail ist erforderlich'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    return null
  },

  password: (value) => {
    if (!value) return 'Passwort ist erforderlich'
    if (value.length < 8) return 'Das Passwort muss mindestens 8 Zeichen lang sein'
    return null
  },

  name: (value) => {
    if (!value || !value.trim()) return 'Name ist erforderlich'
    if (value.trim().length < 2) return 'Der Name muss mindestens 2 Zeichen haben'
    return null
  },

  phone: (value) => {
    if (!value) return null
    const phoneRegex = /^[+]?[\d\s\-()]{8,}$/
    if (!phoneRegex.test(value)) return 'Bitte geben Sie eine gültige Telefonnummer ein'
    return null
  },

  required: (value, fieldName = 'Dieses Feld') => {
    if (!value || !value.toString().trim()) return `${fieldName} ist erforderlich`
    return null
  },

  postalCode: (value) => {
    if (!value) return 'PLZ ist erforderlich'
    const germanPostalRegex = /^\d{5}$/
    if (!germanPostalRegex.test(value)) return 'Bitte geben Sie eine gültige 5-stellige PLZ ein'
    return null
  },

  price: (value) => {
    if (!value) return 'Preis ist erforderlich'
    const num = parseFloat(value)
    if (isNaN(num) || num <= 0) return 'Bitte geben Sie einen gültigen Preis ein'
    return null
  },

  date: (value) => {
    if (!value) return 'Datum ist erforderlich'
    const date = new Date(value)
    if (isNaN(date.getTime())) return 'Bitte geben Sie ein gültiges Datum ein'
    return null
  },

  futureDate: (value) => {
    if (!value) return 'Datum ist erforderlich'
    const date = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return 'Das Datum muss in der Zukunft liegen'
    return null
  }
}

export const validateForm = (data, validationRules) => {
  const errors = {}
  let isValid = true

  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field]
    const value = data[field]

    rules.forEach(validator => {
      const error = validator(value)
      if (error) {
        errors[field] = error
        isValid = false
      }
    })
  })

  return { isValid, errors }
}

export const validatePropertyForm = (form) => {
  const errors = {}

  if (!form.title || form.title.trim().length < 5) {
    errors.title = 'Der Titel muss mindestens 5 Zeichen haben'
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = 'Stadt ist erforderlich'
  }

  if (!form.postal_code) {
    errors.postal_code = 'PLZ ist erforderlich'
  } else if (!/^\d{5}$/.test(form.postal_code)) {
    errors.postal_code = 'Bitte geben Sie eine gültige 5-stellige PLZ ein'
  }

  if (!form.price || parseFloat(form.price) <= 0) {
    errors.price = 'Bitte geben Sie einen gültigen Preis ein'
  }

  if (!form.size_sqm || parseFloat(form.size_sqm) <= 0) {
    errors.size_sqm = 'Bitte geben Sie eine gültige Fläche ein'
  }

  if (!form.rooms || parseInt(form.rooms) < 1) {
    errors.rooms = 'Bitte geben Sie die Anzahl der Zimmer ein'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}