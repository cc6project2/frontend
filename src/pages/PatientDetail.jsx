import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Heading, HStack, Button, VStack, Text, Badge, SimpleGrid,
  Tabs, TabList, TabPanels, Tab, TabPanel, Divider
} from '@chakra-ui/react'
import { FiArrowLeft, FiEdit, FiFileText } from 'react-icons/fi'
import Card from '../components/common/Card'
import { formatDate, formatPhone, formatDPI } from '../utils/formatters'

const PatientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data - luego vendrá del API
  const [patient] = useState({
    id: 1,
    nombre: 'Juan Pérez',
    dpi: '1234567890123',
    edad: 35,
    genero: 'M',
    telefono: '12345678',
    direccion: 'Zona 1, Ciudad de Guatemala',
    email: 'juan@email.com',
    fechaRegistro: '2024-01-15'
  })

  const [consultas] = useState([
    {
      id: 1,
      fecha: '2024-11-10',
      motivo: 'Control rutinario',
      diagnostico: 'Paciente en buen estado general',
      medico: 'Dr. García',
      proximaCita: '2024-12-10'
    },
    {
      id: 2,
      fecha: '2024-10-05',
      motivo: 'Dolor de cabeza',
      diagnostico: 'Migraña tensional',
      medico: 'Dr. García',
      proximaCita: '2024-11-10'
    },
    {
      id: 3,
      fecha: '2024-09-01',
      motivo: 'Revisión anual',
      diagnostico: 'Sin hallazgos significativos',
      medico: 'Dr. López',
      proximaCita: '2024-10-05'
    }
  ])

  const handleNewConsultation = () => {
    navigate(`/consultations/new/${id}`)
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <HStack>
          <Button leftIcon={<FiArrowLeft />} variant="ghost" onClick={() => navigate('/patients')}>
            Volver
          </Button>
          <Heading size="lg">Expediente del Paciente</Heading>
        </HStack>
        <HStack>
          <Button leftIcon={<FiEdit />} colorScheme="green" variant="outline">
            Editar
          </Button>
          <Button leftIcon={<FiFileText />} colorScheme="primary" onClick={handleNewConsultation}>
            Nueva Consulta
          </Button>
        </HStack>
      </HStack>

      <Tabs colorScheme="primary">
        <TabList>
          <Tab>Información Personal</Tab>
          <Tab>Historial Médico</Tab>
          <Tab>Antecedentes</Tab>
        </TabList>

        <TabPanels>
          {/* Información Personal */}
          <TabPanel px={0}>
            <Card>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Box>
                    <Text fontSize="sm" color="gray.600">Nombre Completo</Text>
                    <Text fontSize="lg" fontWeight="bold">{patient.nombre}</Text>
                  </Box>
                  <Badge colorScheme={patient.genero === 'M' ? 'blue' : 'pink'} fontSize="md" px={3} py={1}>
                    {patient.genero === 'M' ? 'Masculino' : 'Femenino'}
                  </Badge>
                </HStack>

                <Divider />

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">DPI</Text>
                    <Text fontWeight="medium">{formatDPI(patient.dpi)}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Edad</Text>
                    <Text fontWeight="medium">{patient.edad} años</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Teléfono</Text>
                    <Text fontWeight="medium">{formatPhone(patient.telefono)}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Email</Text>
                    <Text fontWeight="medium">{patient.email}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Dirección</Text>
                    <Text fontWeight="medium">{patient.direccion}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Fecha de Registro</Text>
                    <Text fontWeight="medium">{formatDate(patient.fechaRegistro)}</Text>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Card>
          </TabPanel>

          {/* Historial Médico */}
          <TabPanel px={0}>
            <VStack spacing={4} align="stretch">
              {consultas.map((consulta) => (
                <Card key={consulta.id} _hover={{ boxShadow: 'md' }} cursor="pointer">
                  <HStack justify="space-between" mb={3}>
                    <Badge colorScheme="blue">{formatDate(consulta.fecha)}</Badge>
                    <Text fontSize="sm" color="gray.600">{consulta.medico}</Text>
                  </HStack>
                  <Text fontWeight="bold" mb={2}>{consulta.motivo}</Text>
                  <Text color="gray.700" mb={3}>{consulta.diagnostico}</Text>
                  {consulta.proximaCita && (
                    <HStack>
                      <Text fontSize="sm" color="gray.600">Próxima cita:</Text>
                      <Badge colorScheme="orange">{formatDate(consulta.proximaCita)}</Badge>
                    </HStack>
                  )}
                </Card>
              ))}
            </VStack>
          </TabPanel>

          {/* Antecedentes */}
          <TabPanel px={0}>
            <Card>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={2}>Antecedentes Personales</Text>
                  <Text color="gray.600">No registra alergias conocidas</Text>
                  <Text color="gray.600">Hipertensión controlada</Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="bold" mb={2}>Antecedentes Familiares</Text>
                  <Text color="gray.600">Padre: Diabetes tipo 2</Text>
                  <Text color="gray.600">Madre: Hipertensión</Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="bold" mb={2}>Medicación Actual</Text>
                  <Text color="gray.600">Losartán 50mg - 1 vez al día</Text>
                </Box>
              </VStack>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default PatientDetail