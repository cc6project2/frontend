// src/services/clinicalDocumentService.js
import api from './api'

export const clinicalDocumentService = {
  getByConsultation: async (consultationId) => {
    const response = await api.get(
      `/clinical-documents/consultation/${consultationId}`,
    )
    return response.data
  },

  uploadForConsultation: async (payload) => {
    // payload:
    // {
    //   patientId,
    //   consultationId,
    //   title,
    //   description,
    //   documentDate,
    //   fileName,
    //   mimeType,
    //   base64Content
    // }
    // documentTypeId: por ahora usamos un id "genérico" (p.ej. 1)
    const body = {
      patientId: payload.patientId,
      consultationId: payload.consultationId,
      documentTypeId: payload.documentTypeId ?? 1, // asegura que en la BD exista ese tipo
      title: payload.title,
      description: payload.description,
      documentDate: payload.documentDate || null,
      fileName: payload.fileName,
      mimeType: payload.mimeType,
      base64Content: payload.base64Content
    }

    const response = await api.post('/clinical-documents', body)
    return response.data
  },
    // 👇 NUEVO
  downloadContent: async (documentId) => {
    const response = await api.get(`/clinical-documents/${documentId}/content`)
    // { fileName, mimeType, base64Content }
    return response.data
  }
}
