import { useState } from 'react'
import { Box, Heading, HStack, Select, Badge, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import Card from '../components/common/Card'
import { formatDate } from '../utils/formatters'

const Consultations = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('')

  const [consultas] = useState([
    {
      id: 1,
      fecha: '2024-11-15',
      paciente: 'Juan Pérez',
      pacienteId: 1,
      motivo: 'Control rutinario',
      diagnostico: 'Paciente en buen estado general',
      medico: 'Dr. García',
      estado: 'completada'
    },
    {
      id: 2,
      fecha: '2024-11-15',
      paciente: 'María García',
      pacienteId: 2,
      motivo: 'Dolor abdominal',
      diagnostico: 'Gastritis aguda',
      medico: 'Dr. García',
      estado: 'completada'
    },
    {
      id: 3,
      fecha: '2024-11-14',
      paciente: 'Carlos López',
      pacienteId: 3,
      motivo: 'Seguimiento hipertensión',
      diagnostico: 'Hipertensión controlada',
      medico: 'Dr. López',
      estado: 'completada'
    },
    {
      id: 4,
      fecha: '2024-11-13',
      paciente: 'Juan Pérez',
      pacienteId: 1,
      motivo: 'Dolor de cabeza',
      diagnostico: 'Migraña tensional',
      medico: 'Dr. García',
      estado: 'completada'
    }
  ])

  const filteredConsultas = consultas.filter(consulta =>
    consulta.paciente.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterDate === '' || consulta.fecha === filterDate)
  )

  const handleConsultaClick = (consulta) => {
    navigate(`/patients/${consulta.pacienteId}`)
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>Consultas Médicas</Heading>

      <HStack mb={6} spacing={4}>
        <Box flex={1}>
          <SearchBar
            placeholder="Buscar por paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Select
          placeholder="Filtrar por fecha"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          maxW="200px"
        >
          <option value="2024-11-15">Hoy</option>
          <option value="2024-11-14">Ayer</option>
          <option value="">Todas</option>
        </Select>
      </HStack>

      <VStack spacing={4} align="stretch">
        {filteredConsultas.map((consulta) => (
          <Card
            key={consulta.id}
            cursor="pointer"
            _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
            onClick={() => handleConsultaClick(consulta)}
          >
            <HStack justify="space-between" mb={3}>
              <HStack spacing={3}>
                <Badge colorScheme="blue">{formatDate(consulta.fecha)}</Badge>
                <Badge colorScheme="green">{consulta.estado}</Badge>
              </HStack>
              <Text fontSize="sm" color="gray.600">{consulta.medico}</Text>
            </HStack>

            <Text fontSize="lg" fontWeight="bold" mb={2}>{consulta.paciente}</Text>
            <Text fontWeight="semibold" color="gray.700" mb={1}>{consulta.motivo}</Text>
            <Text color="gray.600">{consulta.diagnostico}</Text>
          </Card>
        ))}

        {filteredConsultas.length === 0 && (
          <Card textAlign="center" py={8}>
            <Text color="gray.500">No se encontraron consultas</Text>
          </Card>
        )}
      </VStack>
    </Box>
  )
}

export default Consultations