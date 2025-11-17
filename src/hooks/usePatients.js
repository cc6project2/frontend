// src/hooks/usePatients.js
import { useState, useEffect } from 'react'
import { patientService } from '../services/patientService'

export const usePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * fetchPatients({ search, page, pageSize })
   */
  const fetchPatients = async (options = {}) => {
    setLoading(true)
    try {
      const data = await patientService.getAll(options)
      setPatients(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching patients', err)
      setError(err.message || 'Error fetching patients')
    } finally {
      setLoading(false)
    }
  }

  // Cargar pacientes al montar
  useEffect(() => {
    fetchPatients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { patients, loading, error, fetchPatients, setPatients }
}
