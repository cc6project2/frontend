// src/pages/Consultations.jsx
import { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  HStack,
  Select,
  Badge,
  Text,
  VStack,
  Spinner,
  useToast,
  Input
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import Card from '../components/common/Card'
import { formatDate } from '../utils/formatters'
import { consultationService } from '../services/consultationService'

const Consultations = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [consultas, setConsultas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        setLoading(true)
        const data = await consultationService.getAll()
        // data ya viene en el formato esperado desde el backend
        setConsultas(data)
      } catch (err) {
        console.error(err)
        toast({
          title: 'Error al cargar consultas',
          description: err.message || 'Intenta de nuevo más tarde',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      } finally {
        setLoading(false)
      }
    }

    loadConsultations()
  }, [toast])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value)
  }

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value)
  }

  const handleViewPatient = (consulta) => {
    if (!consulta.pacienteId && !consulta.patientId) return
    const pid = consulta.pacienteId || consulta.patientId
    navigate(`/patients/${pid}`)
  }

  const filteredConsultas = consultas.filter((consulta) => {
    const matchesSearch =
      !searchTerm ||
      (consulta.paciente &&
        consulta.paciente.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDate =
      !filterDate ||
      (consulta.fecha &&
        new Date(consulta.fecha).toISOString().slice(0, 10) === filterDate)

    const matchesStatus =
      filterStatus === 'all' ||
      (consulta.estado &&
        consulta.estado.toLowerCase() === filterStatus.toLowerCase())

    return matchesSearch && matchesDate && matchesStatus
  })

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Consultas</Heading>
      </HStack>

      <HStack mb={4} spacing={4} align="flex-end">
        <Box flex="1">
          <SearchBar
            placeholder="Buscar por nombre de paciente..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Filtrar por fecha
          </Text>
          <Input
            type="date"
            value={filterDate}
            onChange={handleFilterDateChange}
            size="sm"
          />
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Estado
          </Text>
          <Select
            value={filterStatus}
            onChange={handleFilterStatusChange}
            size="sm"
          >
            <option value="all">Todos</option>
            <option value="completada">Completadas</option>
            <option value="pendiente">Pendientes</option>
            <option value="cancelada">Canceladas</option>
          </Select>
        </Box>
      </HStack>

      {loading ? (
        <HStack justify="center" py={10}>
          <Spinner size="lg" />
        </HStack>
      ) : (
        <VStack spacing={4} align="stretch">
          {filteredConsultas.map((consulta) => (
            <Card
              key={consulta.id}
              _hover={{ boxShadow: 'md' }}
              cursor="pointer"
              onClick={() => handleViewPatient(consulta)}
            >
              <HStack justify="space-between" mb={2}>
                <HStack spacing={3}>
                  <Text fontWeight="bold">{consulta.paciente}</Text>
                  <Badge colorScheme="blue">
                    {formatDate(consulta.fecha)}
                  </Badge>
                </HStack>
                <Badge
                  colorScheme={
                    consulta.estado === 'completada'
                      ? 'green'
                      : consulta.estado === 'cancelada'
                      ? 'red'
                      : 'orange'
                  }
                >
                  {consulta.estado || 'completada'}
                </Badge>
              </HStack>
              <Text fontWeight="medium" mb={1}>
                {consulta.motivo}
              </Text>
              <Text color="gray.600">{consulta.diagnostico}</Text>
            </Card>
          ))}

          {filteredConsultas.length === 0 && !loading && (
            <Card textAlign="center" py={8}>
              <Text color="gray.500">No se encontraron consultas</Text>
            </Card>
          )}
        </VStack>
      )}
    </Box>
  )
}

export default Consultations
