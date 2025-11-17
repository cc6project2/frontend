// src/routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import NewConsultation from './pages/NewConsultation'
import Consultations from './pages/Consultations'
import Users from './pages/Users'
import { ROLES } from './utils/constants'

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth()

  if (loading) {
    // Aquí podrías meter un spinner de Chakra si quieres
    return <div>Cargando...</div>
  }

  // No autenticado → al login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si la ruta tiene restricción de roles y el usuario no está permitido → al dashboard
  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      {/* Rutas privadas (solo autenticados) */}
      <Route
        path="/"
        element={
          <PrivateRoute roles={[ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT]}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute roles={[ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT]}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/patients"
        element={
          <PrivateRoute roles={[ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT]}>
            <MainLayout>
              <Patients />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/patients/:id"
        element={
          <PrivateRoute roles={[ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT]}>
            <MainLayout>
              <PatientDetail />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/consultations/new/:patientId"
        element={
          <PrivateRoute roles={[ROLES.ADMIN, ROLES.DOCTOR]}>
            <MainLayout>
              <NewConsultation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/consultations"
        element={
          <PrivateRoute roles={[ROLES.ADMIN, ROLES.DOCTOR]}>
            <MainLayout>
              <Consultations />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute roles={[ROLES.ADMIN]}>
            <MainLayout>
              <Users />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
