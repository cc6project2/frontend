export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatPhone = (phone) => {
  if (!phone) return ''
  return phone.replace(/(\d{4})(\d{4})/, '$1-$2')
}

export const formatDPI = (dpi) => {
  if (!dpi) return ''
  return dpi.replace(/(\d{4})(\d{5})(\d{4})/, '$1 $2 $3')
}