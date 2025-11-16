import api from './api'

export const consultationService = {
  getAll: async () => {
    const response = await api.get('/consultations')
    return response.data
  },

  getByPatientId: async (patientId) => {
    const response = await api.get(`/consultations/patient/${patientId}`)
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/consultations/${id}`)
    return response.data
  },

  create: async (consultationData) => {
    const response = await api.post('/consultations', consultationData)
    return response.data
  },

  update: async (id, consultationData) => {
    const response = await api.put(`/consultations/${id}`, consultationData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/consultations/${id}`)
    return response.data
  }
}