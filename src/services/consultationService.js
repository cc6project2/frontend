// src/services/consultationService.js
import api from './api'

export const consultationService = {
  /**
   * Obtener todas las consultas
   * (más adelante podemos agregar filtros: search, date, status, etc.)
   */
  getAll: async () => {
    const response = await api.get('/consultations')
    // El backend devuelve algo como:
    // [{ id, pacienteId, paciente, fecha, motivo, diagnostico, medico, estado }, ...]
    return response.data
  },

  /**
   * Consultas de un paciente específico
   */
  getByPatientId: async (patientId) => {
    const response = await api.get(`/consultations/patient/${patientId}`)
    // Backend devuelve algo como:
    // [{ id, fecha, motivo, diagnostico, estado }, ...]
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/consultations/${id}`)
    return response.data
  },

  /**
   * Crear consulta
   * consultationData debe tener:
   *  {
   *    patientId,
   *    motivo,
   *    diagnostico,
   *    tratamiento,
   *    observaciones,
   *    examenFisico,
   *    presionArterial,
   *    frecuenciaCardiaca,
   *    temperatura,
   *    peso,
   *    talla,
   *    proximaCita
   *  }
   * El doctor se obtiene del token en el backend.
   */
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
