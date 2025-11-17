// src/utils/constants.js

export const API_URL = 'http://localhost:3000/api'

// Estos valores deben coincidir EXACTAMENTE con los roles de la BD/backend
export const ROLES = {
  ADMIN: 'administrator',
  DOCTOR: 'doctor',
  ASSISTANT: 'assistant'
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
