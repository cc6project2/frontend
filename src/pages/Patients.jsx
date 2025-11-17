// src/pages/Patients.jsx
import { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  HStack,
  useDisclosure,
  useToast,
  Spinner,
  Text
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import Modal from '../components/common/Modal'
import PatientForm from '../components/patients/PatientForm'
import PatientList from '../components/patients/PatientList'
import { usePatients } from '../hooks/usePatients'
import { patientService } from '../services/patientService'

const Patients = () => {
  const { patients, loading, error, fetchPatients } = usePatients()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearchTerm(value)
    // Búsqueda simple en tiempo real contra el backend
    await fetchPatients({ search: value })
  }

  const handleNewPatient = () => {
    setSelectedPatient(null)
    onOpen()
  }

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient)
    onOpen()
  }

  const handleViewPatient = (patient) => {
    navigate(`/patients/${patient.id}`)
  }

  const handleDeletePatient = async (patient) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar al paciente "${patient.nombre}"?`
    )
    if (!confirmed) return

    try {
      setIsSaving(true)
      await patientService.delete(patient.id)
      toast({
        title: 'Paciente eliminado',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      await fetchPatients({ search: searchTerm })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al eliminar paciente',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      setIsSaving(true)

      if (selectedPatient) {
        // Update
        await patientService.update(selectedPatient.id, formData)
        toast({
          title: 'Paciente actualizado',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      } else {
        // Create
        await patientService.create(formData)
        toast({
          title: 'Paciente creado',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }

      onClose()
      setSelectedPatient(null)
      await fetchPatients({ search: searchTerm })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al guardar paciente',
        description: err.message || 'Intenta de nuevo más tarde',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Pacientes</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="primary"
          onClick={handleNewPatient}
          isLoading={isSaving}
        >
          Nuevo Paciente
        </Button>
      </HStack>

      <HStack mb={4} justify="space-between">
        <Box flex="1">
          <SearchBar
            placeholder="Buscar por nombre, DPI o email..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
      </HStack>

      {error && (
        <Box mb={4}>
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        </Box>
      )}

      {loading ? (
        <HStack justify="center" py={10}>
          <Spinner size="lg" />
        </HStack>
      ) : (
        <PatientList
          patients={patients}
          onView={handleViewPatient}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setSelectedPatient(null)
        }}
        title={selectedPatient ? 'Editar Paciente' : 'Nuevo Paciente'}
      >
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleSubmit}
          onCancel={() => {
            onClose()
            setSelectedPatient(null)
          }}
          isLoading={isSaving}
        />
      </Modal>
    </Box>
  )
}

export default Patients
