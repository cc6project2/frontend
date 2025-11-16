import { useState, useEffect } from 'react'
import { patientService } from '../services/patientService'

export const usePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPatients = async () => {
    setLoading(true)
    try {
      const data = await patientService.getAll()
      setPatients(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // fetchPatients() // Descomentar cuando el backend esté listo
  }, [])

  return { patients, loading, error, fetchPatients, setPatients }
}