// src/services/dashboardService.js
import api from './api'

export const dashboardService = {
  getSummary: async () => {
    // GET /api/dashboard/summary
    const response = await api.get('/dashboard/summary')
    // { totalPatients, totalConsultationsToday, upcomingAppointments: [...] }
    return response.data
  }
}
