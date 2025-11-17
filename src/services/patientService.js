// src/services/patientService.js
import api from './api'

export const patientService = {
  /**
   * Obtener listado de pacientes
   * options: { search?: string, page?: number, pageSize?: number }
   */
  getAll: async (options = {}) => {
    const {
      search = '',
      page = 1,
      pageSize = 20
    } = options

    const params = { page, pageSize }

    if (search && search.trim() !== '') {
      params.search = search.trim()
    }

    const response = await api.get('/patients', { params })
    // El backend devuelve un array de pacientes ya formateados:
    // { id, nombre, dpi, edad, genero, telefono, direccion, email, activo, fechaRegistro }
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/patients/${id}`)
    return response.data
  },

  create: async (patientData) => {
    // patientData debe incluir: nombre, dpi, edad, genero, telefono, direccion, email
    const response = await api.post('/patients', patientData)
    return response.data
  },

  update: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/patients/${id}`)
    return response.data
  },

  /**
   * search(term) = alias de getAll({ search: term })
   */
  search: async (searchTerm) => {
    return patientService.getAll({ search: searchTerm })
  }
}
