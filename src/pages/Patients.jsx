import { useState } from 'react'
import { Box, Button, Heading, HStack, useDisclosure, useToast } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import Modal from '../components/common/Modal'
import PatientForm from '../components/patients/PatientForm'
import PatientList from '../components/patients/PatientList'

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, nombre: 'Juan Pérez', dpi: '1234567890123', edad: 35, genero: 'M', telefono: '12345678', direccion: 'Zona 1, Ciudad', email: 'juan@email.com' },
    { id: 2, nombre: 'María García', dpi: '9876543210987', edad: 28, genero: 'F', telefono: '87654321', direccion: 'Zona 10, Ciudad', email: 'maria@email.com' },
    { id: 3, nombre: 'Carlos López', dpi: '5555555555555', edad: 42, genero: 'M', telefono: '55555555', direccion: 'Zona 5, Ciudad', email: 'carlos@email.com' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast()

  const filteredPatients = patients.filter(patient =>
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dpi.includes(searchTerm)
  )

  const handleNew = () => {
    setSelectedPatient(null)
    onOpen()
  }

  const handleEdit = (patient) => {
    setSelectedPatient(patient)
    onOpen()
  }

  const handleView = (patient) => {
    navigate(`/patients/${patient.id}`)
  }

  const handleDelete = (patient) => {
    if (window.confirm(`¿Eliminar a ${patient.nombre}?`)) {
      setPatients(patients.filter(p => p.id !== patient.id))
      toast({
        title: 'Paciente eliminado',
        status: 'success',
        duration: 3000,
      })
    }
  }

  const handleSubmit = (formData) => {
    setIsLoading(true)
    
    setTimeout(() => {
      if (selectedPatient) {
        setPatients(patients.map(p => p.id === selectedPatient.id ? { ...p, ...formData } : p))
        toast({ title: 'Paciente actualizado', status: 'success', duration: 3000 })
      } else {
        const newPatient = { id: patients.length + 1, ...formData }
        setPatients([...patients, newPatient])
        toast({ title: 'Paciente creado', status: 'success', duration: 3000 })
      }
      
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Pacientes</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="primary" onClick={handleNew}>
          Nuevo Paciente
        </Button>
      </HStack>

      <Box mb={6}>
        <SearchBar
          placeholder="Buscar por nombre o DPI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box bg="white" borderRadius="lg" boxShadow="sm">
        <PatientList
          patients={filteredPatients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={selectedPatient ? 'Editar Paciente' : 'Nuevo Paciente'}
      >
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </Modal>
    </Box>
  )
}

export default Patients