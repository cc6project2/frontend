// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hidratar desde localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
      } catch {
        // Si algo está corrupto, limpiamos
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      }
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // authService.login → POST /auth/login { email, password }
    // Backend debe devolver: { token, user }
    const data = await authService.login(email, password)

    if (!data || !data.token || !data.user) {
      throw new Error('Respuesta de login inválida desde el servidor')
    }

    // Guardar en localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Actualizar contexto
    setUser(data.user)

    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
