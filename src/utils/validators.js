export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateDPI = (dpi) => {
  return dpi && dpi.length === 13 && /^\d+$/.test(dpi)
}

export const validatePhone = (phone) => {
  return phone && phone.length === 8 && /^\d+$/.test(phone)
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}