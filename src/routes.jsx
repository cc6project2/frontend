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

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Cargando...</div>
  
  return user ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      
      <Route path="/" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
      <Route path="/patients" element={<PrivateRoute><MainLayout><Patients /></MainLayout></PrivateRoute>} />
      <Route path="/patients/:id" element={<PrivateRoute><MainLayout><PatientDetail /></MainLayout></PrivateRoute>} />
      <Route path="/consultations/new/:patientId" element={<PrivateRoute><MainLayout><NewConsultation /></MainLayout></PrivateRoute>} />
      <Route path="/consultations" element={<PrivateRoute><MainLayout><Consultations /></MainLayout></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><MainLayout><Users /></MainLayout></PrivateRoute>} />
    </Routes>
  )
}

export default AppRoutes