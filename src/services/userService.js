// src/services/userService.js
import api from './api'

export const userService = {
  getAll: async () => {
    const response = await api.get('/users')
    // backend debe devolver:
    // [{ id, nombre, correo, username, rol, activo }, ...]
    return response.data
  },

  create: async (userData) => {
    // userData: { nombre, correo, username, password, rol }
    const response = await api.post('/users', userData)
    return response.data
  },

  update: async (id, userData) => {
    // si password viene vacío, el backend puede ignorarlo y no cambiarlo
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  }
}
