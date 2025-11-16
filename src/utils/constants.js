export const API_URL = 'http://localhost:3000/api'

export const ROLES = {
  ADMIN: 'administrador',
  DOCTOR: 'medico',
  ASSISTANT: 'asistente'
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  PATIENT_DETAIL: '/patients/:id',
  NEW_CONSULTATION: '/consultations/new/:patientId',
  CONSULTATIONS: '/consultations',
  USERS: '/users'
}