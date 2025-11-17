// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Spinner,
  useToast
} from '@chakra-ui/react'
import { FiCalendar, FiUsers, FiActivity } from 'react-icons/fi'
import Card from '../components/common/Card'
import { formatDate } from '../utils/formatters'
import { dashboardService } from '../services/dashboardService'

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalPatients: 0,
    totalConsultationsToday: 0,
    upcomingAppointments: []
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true)
        const data = await dashboardService.getSummary()
        setSummary({
          totalPatients: data.totalPatients ?? 0,
          totalConsultationsToday: data.totalConsultationsToday ?? 0,
          upcomingAppointments: Array.isArray(data.upcomingAppointments)
            ? data.upcomingAppointments
            : []
        })
      } catch (err) {
        console.error(err)
        toast({
          title: 'Error al cargar dashboard',
          description: err.message || 'Intenta de nuevo más tarde',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [toast])

  const { totalPatients, totalConsultationsToday, upcomingAppointments } = summary

  const formatTime = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleTimeString('es-GT', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>
        Dashboard
      </Heading>

      {loading && (
        <HStack justify="center" py={8}>
          <Spinner size="lg" />
        </HStack>
      )}

      {/* Estadísticas rápidas */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Card>
          <HStack justify="space-between">
            <Stat>
              <StatLabel>Pacientes registrados</StatLabel>
              <StatNumber>{totalPatients}</StatNumber>
              <StatHelpText>Total en el sistema</StatHelpText>
            </Stat>
            <Box
              bg="primary.50"
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiUsers size={20} color="#2B6CB0" />
            </Box>
          </HStack>
        </Card>

        <Card>
          <HStack justify="space-between">
            <Stat>
              <StatLabel>Consultas hoy</StatLabel>
              <StatNumber>{totalConsultationsToday}</StatNumber>
              <StatHelpText>Registradas en la fecha actual</StatHelpText>
            </Stat>
            <Box
              bg="green.50"
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiActivity size={20} color="#2F855A" />
            </Box>
          </HStack>
        </Card>

        <Card>
          <HStack justify="space-between">
            <Stat>
              <StatLabel>Próximas citas</StatLabel>
              <StatNumber>{upcomingAppointments.length}</StatNumber>
              <StatHelpText>Próximas 5 citas programadas</StatHelpText>
            </Stat>
            <Box
              bg="purple.50"
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiCalendar size={20} color="#6B46C1" />
            </Box>
          </HStack>
        </Card>
      </SimpleGrid>

      {/* Próximas citas */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <Heading size="md" mb={4}>
            Próximas citas
          </Heading>

          {upcomingAppointments.length === 0 ? (
            <Text color="gray.500">No hay citas próximas programadas.</Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {upcomingAppointments.map((cita) => (
                <HStack
                  key={cita.id}
                  justify="space-between"
                  p={3}
                  borderRadius="md"
                  bg="gray.50"
                >
                  <HStack spacing={3}>
                    <Box
                      bg="primary.100"
                      borderRadius="full"
                      p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <FiCalendar size={16} />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">{cita.paciente}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {formatDate(cita.fechaHora)} - {formatTime(cita.fechaHora)}
                      </Text>
                      {cita.medico && (
                        <Text fontSize="xs" color="gray.500">
                          {cita.medico}
                        </Text>
                      )}
                    </Box>
                  </HStack>
                  <Badge colorScheme="blue">Programada</Badge>
                </HStack>
              ))}
            </VStack>
          )}
        </Card>

        {/* Aquí dejamos un card “libre” para futuro:
            - gráfico simple
            - resumen por médico
            - métricas de productividad, etc. */}
        <Card>
          <Heading size="md" mb={4}>
            Resumen general
          </Heading>
          <Text color="gray.600">
            En futuras versiones puedes usar este espacio para mostrar gráficas
            de distribución por médico, tipos de consulta, horas pico, etc.
          </Text>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
