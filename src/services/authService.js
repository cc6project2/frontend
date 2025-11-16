import api from './api'

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
      oldPassword,
      newPassword
    })
    return response.data
  }
}