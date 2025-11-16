import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Heading, VStack, HStack, Text, Badge } from '@chakra-ui/react'
import { FiCalendar } from 'react-icons/fi'
import Card from '../components/common/Card'
import { formatDate } from '../utils/formatters'

const Dashboard = () => {
  const proximasCitas = [
    { id: 1, paciente: 'Juan Pérez', fecha: '2024-11-16', hora: '09:00' },
    { id: 2, paciente: 'María García', fecha: '2024-11-16', hora: '10:30' },
    { id: 3, paciente: 'Carlos López', fecha: '2024-11-17', hora: '14:00' },
  ]

  return (
    <Box>
      <Heading size="lg" mb={6}>Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Card>
          <Stat>
            <StatLabel color="gray.600">Total Pacientes</StatLabel>
            <StatNumber fontSize="3xl" color="primary.600">156</StatNumber>
            <StatHelpText>+12 este mes</StatHelpText>
          </Stat>
        </Card>

        <Card>
          <Stat>
            <StatLabel color="gray.600">Consultas Hoy</StatLabel>
            <StatNumber fontSize="3xl" color="green.600">8</StatNumber>
            <StatHelpText>4 completadas</StatHelpText>
          </Stat>
        </Card>

        <Card>
          <Stat>
            <StatLabel color="gray.600">Próximas Citas</StatLabel>
            <StatNumber fontSize="3xl" color="orange.600">23</StatNumber>
            <StatHelpText>Esta semana</StatHelpText>
          </Stat>
        </Card>
      </SimpleGrid>

      <Card>
        <Heading size="md" mb={4}>Próximas Citas</Heading>
        <VStack spacing={3} align="stretch">
          {proximasCitas.map((cita) => (
            <HStack
              key={cita.id}
              p={3}
              bg="gray.50"
              borderRadius="md"
              justify="space-between"
              _hover={{ bg: 'gray.100' }}
            >
              <HStack spacing={3}>
                <Box color="primary.600">
                  <FiCalendar size={20} />
                </Box>
                <Box>
                  <Text fontWeight="bold">{cita.paciente}</Text>
                  <Text fontSize="sm" color="gray.600">{formatDate(cita.fecha)} - {cita.hora}</Text>
                </Box>
              </HStack>
              <Badge colorScheme="blue">Programada</Badge>
            </HStack>
          ))}
        </VStack>
      </Card>
    </Box>
  )
}

export default Dashboard